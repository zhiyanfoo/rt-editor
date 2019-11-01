# from flask import Flask, request, jsonify
# app = Flask(__name__)
# from flask_socketio import SocketIO
import asyncio
import websockets
import json
import logging

import psycopg2
# socketio = SocketIO(app)

conn = psycopg2.connect("dbname=mydb user=john password=holax host=localhost")
cur = conn.cursor()
cur.execute('drop table if exists delta')
cur.execute('create table delta (id serial primary key, command text, created_at timestamp default current_timestamp);')

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


async def notify_users():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = users_event()
        await asyncio.wait([user.send(message) for user in USERS])


async def register(websocket):
    USERS.add(websocket)
    await notify_users()


async def unregister(websocket):
    USERS.remove(websocket)
    await notify_users()


async def counter(websocket, path):
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        await websocket.send(state_event())
        async for message in websocket:
            data = json.loads(message)
            if data["type"] == "ON_BEFORE_CHANGE":
                print(data)
            else:
                logging.error("unsupported event: {}", data)
    finally:
        await unregister(websocket)


start_server = websockets.serve(counter, "localhost", 5000)

print("Starting")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

socketio.run(app)
