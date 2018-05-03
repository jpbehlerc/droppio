FROM python:3.6.4-stretch

WORKDIR /usr/src/app

RUN pip install --no-cache-dir \
    tornado \
    aiocouchdb \
   

VOLUME ../droppio /usr/src/app

CMD [ "python", "./py/droppio.py" ]
