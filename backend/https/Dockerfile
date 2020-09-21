FROM python:3.9-rc-buster
WORKDIR http_app
COPY words/words words/words 
COPY https/requirements.txt app/requirements.txt
RUN pip3 install -r app/requirements.txt
COPY https/main.py app/main.py
COPY https/run_waitress.py app/run_waitress.py
WORKDIR app
CMD ["python3", "run_waitress.py"]
