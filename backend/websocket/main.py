import os
import asyncio
import json
import logging

import websockets
import psycopg2
import psycopg2.extras
import toml
from collections import defaultdict

path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
config = toml.load(os.path.join(path, "config.toml"))

host = config['postgres_host']

conn = psycopg2.connect(f"dbname=mydb user=john password=holax host={host}")
cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

# unique column auto indexed
cur.execute(
    "create table if not exists document"
    " (id serial primary key, document_tag varchar(200) unique)"
)

cur.execute(
    "create table if not exists delta "
    "(id serial primary key, document_id integer references document (id)"
    " , command text, created_at timestamp default current_timestamp)"
)

cur.execute('create index if not exists document_id_idx on delta (document_id)')
conn.commit()

logging.basicConfig()

STATE = {"value": 0}

DOCUMENT_ID_TO_WEBSOCKETS = defaultdict(set)
WEBSOCKET_TO_DOCUMENT_ID = {}

def get_document_id(document_tag):
    cur.execute(
        'select id from document where document_tag = %s',
        (document_tag, )
    )
    document_ids = cur.fetchall()
    if len(document_ids) != 1:
        raise f'duplicate documents with tag {document_tag}'
    return document_ids[0]['id']


def insert_delta(document_id, command):
    cur.execute(
        'insert into delta (document_id, command) values (%s, %s)',
        (document_id, command)
    )
    conn.commit()

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
                conn.commit()
                await broadcast_message(websocket, document_id, message)
            elif t in ['ADD_SOCKET']:
                document_id = get_document_id(data['document_tag'])
                add_socket(document_id, websocket)
            else:
                logging.error(f"unsupported event: {data}")
    finally:
        await unregister(websocket)

start_server = websockets.serve(counter, "localhost", 5000)

print("Starting")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

socketio.run(app)

import atexit
def cleanup():
    cur.close()
    conn.close()

atexit.register(cleanup)
