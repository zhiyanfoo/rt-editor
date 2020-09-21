export FLASK_APP=main.py
export FLASK_ENV=development
export POSTGRES_HOST='localhost'
export POSTGRES_USER='dev_user'
export POSTGRES_DB='dev_db'
export POSTGRES_PASSWORD='dev_password'
export APP_ORIGIN='http://localhost:3000'
flask run --port=5001
