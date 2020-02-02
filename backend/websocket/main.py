import os
import asyncio
import json
import logging

import websockets
import psycopg2
import psycopg2.extras
import toml

path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
config = toml.load(os.path.join(path, "config.toml"))

host = config['postgres_host']

conn = psycopg2.connect(f"dbname=mydb user=john password=holax host={host}")
cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
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

USERS = set()

def state_event():
    return json.dumps({"type": "state", **STATE})

def users_event():
    return json.dumps({"type": "users", "count": len(USERS)})

async def notify_state():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = state_event()
        await asyncio.wait([user.send(message) for user in USERS])

async def broadcast_message(user, message):
    other_users = USERS - set([user])
    if other_users:
        await asyncio.wait([user.send(message) for user in other_users])

async def notify_users():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = users_event()
        await asyncio.wait([user.send(message) for user in USERS])

def get_all_commands():
    cur.execute('select command from delta')
    return [x['command'] for x in cur.fetchall()]


async def sync_up(user):
    commands = get_all_commands()
    for command in commands:
        asyncio.ensure_future(broadcast_message(user, command))


async def register(websocket):
    USERS.add(websocket)
    asyncio.ensure_future(sync_up(websocket))

    # await notify_users()

async def unregister(websocket):
    USERS.remove(websocket)
    # await notify_users()

async def counter(websocket, path):
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)
            t = data["type"]
            if t in ["BROADCAST_INSERT", "BROADCAST_DELETE"]:
                cur.execute('insert into delta (command) values (%s)', (message,))
                conn.commit()
                await broadcast_message(websocket, message)
            elif t in ['ADD_USER']:
                continue
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
