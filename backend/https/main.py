import os
import json
import uuid
import random

import toml
from flask import Flask
import psycopg2
import psycopg2.extras
from flask_cors import CORS

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
    return "-".join(WORDS[rd.randint(0, WORDS_LEN - 1)].strip() for _ in range(4))

def create_new_doc():
    tag = generate_document_id_()
    cur.execute(
        "insert into document (document_tag) values (%s) returning id",
        (tag,)
    )
    conn.commit()
    return tag

@app.route('/generate_document', methods=['POST'])
def generate_document():
    tag = create_new_doc()
    return json.dumps({'document_tag': tag})

import atexit
def cleanup():
    WORDS_FILE.close()

atexit.register(cleanup)
