import os
import json
import uuid
import random

import toml
from flask import Flask
import psycopg2
import psycopg2.extras
from flask_cors import CORS
from flask import request

rd = random.Random()
app = Flask(__name__)
CORS(app, origin='http://localhost:3000')

path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
config = toml.load(os.path.join(path, "config.toml"))

host = config['postgres_host']

conn = psycopg2.connect(f"dbname=mydb user=john password=holax host={host}")
cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

WORDS_FILE = open('../words/words', 'r')
WORDS = WORDS_FILE.readlines()
WORDS_LEN = len(WORDS)

def generate_document_id_():
    return "-".join(WORDS[rd.randint(0, WORDS_LEN - 1)].lower().strip() for _ in range(4))

def create_new_doc():
    tag = generate_document_id_()
    cur.execute(
        "insert into document (document_tag) values (%s) returning id",
        (tag,)
    )
    conn.commit()
    return tag

def get_commands(document_id):
    cur.execute('select command from delta where document_id = %s', (document_id,))
    return [x['command'] for x in cur.fetchall()]

def get_document_id(document_tag):
    cur.execute(
        'select document.id from document where document_tag = %s',
        (document_tag,)
    )
    document_ids = cur.fetchall()
    if len(document_ids) != 1:
        raise f'duplicate documents with tag {document_tag}'
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

import atexit
def cleanup():
    WORDS_FILE.close()

atexit.register(cleanup)
