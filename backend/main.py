from flask import Flask, request, jsonify
app = Flask(__name__)

import psycopg2

conn = psycopg2.connect("dbname=mydb user=john password=holax host=localhost")
cur = conn.cursor()
cur.execute('create table if not exists delta (id serial primary key, command text, created_at timestamp default current_timestamp);')

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/command', methods = ['POST'])
def add_command():
    j = request.get_json()
    print(j)
    command = j['command']
    cur.execute(f"insert into delta (command) values ('{command}')")
    return jsonify({'success':True}), 200, {'ContentType':'application/json'}
