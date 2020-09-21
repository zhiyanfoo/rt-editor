import atexit
import os
import asyncio
import json
import logging

from threading import Thread
import time

import websockets
import psycopg2
import psycopg2.extras
import psycopg2.pool
from collections import defaultdict

host = os.environ['POSTGRES_HOST']
dbname = os.environ['POSTGRES_DB']
user = os.environ['POSTGRES_USER']
password = os.environ['POSTGRES_PASSWORD']
port = os.environ['PORT']

connection_arg = f"dbname={dbname} user={user} password={password} host={host}"
connection_pool = psycopg2.pool.ThreadedConnectionPool(4,4, connection_arg)
def cleanup():
    connection_pool.closeall()

atexit.register(cleanup)

migration_conn = connection_pool.getconn()
try:
    migration_cur = migration_conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # unique column auto indexed
    migration_cur.execute(
        "create table if not exists document"
        " (id serial primary key, document_tag varchar(200) unique)"
    )

    migration_cur.execute(
        "create table if not exists delta "
        "(id serial primary key, document_id integer references document (id)"
        " , command text, created_at timestamp default current_timestamp)"
    )

    migration_cur.execute('create index if not exists document_id_idx on delta (document_id)')
    migration_conn.commit()
    migration_cur.close()
finally:
    connection_pool.putconn(migration_conn)

logging.basicConfig()

def background_task():
    while True:
        conn = connection_pool.getconn()
        try:
            cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
            cur.execute('select 1;')
            document_ids = cur.fetchall()
            cur.close()
        except Exception as e:
            print('Unable to connect to pg, exiting app')
            cleanup()
            os._exit(1)
        finally:
            connection_pool.putconn(conn)
        time.sleep(10)

t = Thread(target=background_task)
t.start()

STATE = {"value": 0}

DOCUMENT_ID_TO_WEBSOCKETS = defaultdict(set)
WEBSOCKET_TO_DOCUMENT_ID = {}

def get_document_id(document_tag):
    conn = connection_pool.getconn()
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(
            'select document.id from document where document_tag = %s',
            (document_tag,)
        )
        document_ids = cur.fetchall()
        cur.close()
    finally:
        connection_pool.putconn(conn)
    if len(document_ids) == 0:
        raise ValueError(f"missing document tag '{document_tag}'")
    elif len(document_ids) > 1:
        raise ValueError(f"duplicate documents with tag '{document_tag}'")
    return document_ids[0]['id']

def insert_delta(document_id, command):
    conn = connection_pool.getconn()
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(
            'insert into delta (document_id, command) values (%s, %s)',
            (document_id, command)
        )
        conn.commit()
        cur.close()
    finally:
        connection_pool.putconn(conn)

def state_event():
    return json.dumps({"type": "state", **STATE})

def users_event():
    return json.dumps({"type": "users", "count": len(USERS)})

# async def notify_state():
#     if USERS:  # asyncio.wait doesn't accept an empty list
#         message = state_event()
#         await asyncio.wait([user.send(message) for user in USERS])

async def broadcast_message(websocket, document_id, message):
    other_websockets = DOCUMENT_ID_TO_WEBSOCKETS[document_id] - set([websocket])
    if other_websockets:
        await asyncio.wait(
            [websocket.send(message) for websocket in other_websockets])

async def notify_users():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = users_event()
        await asyncio.wait([user.send(message) for user in USERS])

def add_socket(document_id, websocket):
    DOCUMENT_ID_TO_WEBSOCKETS[document_id].add(websocket)
    WEBSOCKET_TO_DOCUMENT_ID[websocket] = document_id

async def unregister(websocket):
    document_id = WEBSOCKET_TO_DOCUMENT_ID[websocket]
    del WEBSOCKET_TO_DOCUMENT_ID[websocket]
    DOCUMENT_ID_TO_WEBSOCKETS[document_id].remove(websocket)

    # await notify_users()

async def counter(websocket, path):
    # await register(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)
            print(data)
            t = data["type"]
            if t in ["BROADCAST_INSERT", "BROADCAST_DELETE"]:
                document_id = get_document_id(data['document_tag'])
                insert_delta(document_id, message)
                await broadcast_message(websocket, document_id, message)
            elif t in ['ADD_SOCKET']:
                document_id = get_document_id(data['document_tag'])
                add_socket(document_id, websocket)
            else:
                logging.error(f"unsupported event: {data}")
    finally:
        await unregister(websocket)

start_server = websockets.serve(counter, "0.0.0.0", port)

print("Starting")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

socketio.run(app)

