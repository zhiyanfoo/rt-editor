import atexit
import os
import json
import uuid
import random

from flask import Flask
import psycopg2
import psycopg2.extras
import psycopg2.pool
from flask_cors import CORS
from flask import request

host = os.environ['POSTGRES_HOST']
dbname = os.environ['POSTGRES_DB']
user = os.environ['POSTGRES_USER']
password = os.environ['POSTGRES_PASSWORD']
origin = os.environ['APP_ORIGIN']

rd = random.Random()
app = Flask(__name__)
CORS(app, origin=origin)

connection_arg = f"dbname={dbname} user={user} password={password} host={host}"
connection_pool = psycopg2.pool.ThreadedConnectionPool(4,4, connection_arg)
def cleanup():
    WORDS_FILE.close()
    connection_pool.closeall()

atexit.register(cleanup)

WORDS_FILE = open('../words/words', 'r')
WORDS = WORDS_FILE.readlines()
WORDS_LEN = len(WORDS)

def generate_document_id_():
    return "-".join(WORDS[rd.randint(0, WORDS_LEN - 1)].lower().strip() for _ in range(4))

def create_new_doc():
    tag = generate_document_id_()
    conn = connection_pool.getconn()
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(
            "insert into document (document_tag) values (%s) returning id",
            (tag,)
        )
        conn.commit()
        cur.close()
    finally:
        connection_pool.putconn(conn)
    return tag

def get_commands(document_id):
    conn = connection_pool.getconn()
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute('select command from delta where document_id = %s', (document_id,))
        result = [x['command'] for x in cur.fetchall()]
        cur.close()
    finally:
        connection_pool.putconn(conn)
    return result

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

@app.route('/document', methods=['POST'])
def document():
    tag = create_new_doc()
    return json.dumps({'document_tag': tag})


@app.route('/commands/<document_tag>', methods=['GET'])
def generate_document(document_tag):
    document_id = get_document_id(document_tag)
    commands = get_commands(document_id)
    return json.dumps({'commands': commands})
