FROM python:3.9-rc-buster
WORKDIR app
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY main.py .
CMD ["python", "main.py"]
