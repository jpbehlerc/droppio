#!/usr/bin/python3.5

import tornado.web
import tornado.auth
from tornado.auth import AuthError
from tornado.web import HTTPError,MissingArgumentError
from tornado.httpserver import HTTPServer
from tornado.httpclient import AsyncHTTPClient,HTTPRequest,HTTPError
from tornado.escape import xhtml_escape
from tornado.escape import json_decode,json_encode
from tornado.gen import coroutine
from tornado.ioloop import PeriodicCallback
from tornado import ioloop
from base64 import b32encode
from os import urandom
from aiocouchdb.errors import HttpErrorException
from collections import defaultdict,deque
from requests.exceptions import Timeout,ConnectionError
import syslog
import logging
import argparse
import types
import signal
import os
import sys
import binascii
import faulthandler
import socket
import fcntl
import struct
import datetime
import tornado.concurrent as concurrent
from tornado.platform.asyncio import AsyncIOMainLoop
import asyncio
import aiocouchdb
import datetime
import requests

logging.basicConfig(format='Vike [%(levelname)s][%(asctime)s]:  %(message)s', stream=sys.stdout, datefmt='%m-%d-%Y %I:%M:%S %p')
faulthandler.enable(file=open('/var/log/vikeBookings.debug',mode='a'))

mails = deque()

#sys.excepthook = handle_exception

def handle_exception(exc,val):

    logging.error('Caught Unhandled {} Exception {}'.format(exc,value))

def handle_sig(signum,sigframe):

    logging.error('Caught Signal {}'.format(signum))


for s in [6,15,7,1,3,4,5,24,25]: signal.signal(s,handle_sig)


class errorHandler(tornado.web.RequestHandler):

    def get(self):

        #Implement custom 404 page!
        self.write("HTTP 404: Sorry the requested page has not been found...")

    def post(self):

        self.write("HTTP 404: Sorry the requested page has not been found...")


class heart(tornado.web.RequestHandler):

    def get(self):

        self.write("beat")


class booking(tornado.web.RequestHandler):

    def initialize(self):

        self.gatling_url = "https://api.mailgun.net/v3/gatling.nabla.tech/messages"
        self.gatling_key = ("api", "key-ab4d563107f353b01e48937a9e6f934a")
        self.send = requests.post

        PeriodicCallback(self.shooter,5000).start()


    def get_current_user(self):

        self.cookie = self.get_secure_cookie('vikeProfile')
        return self.cookie


    def write_error(self,*args,**kw):

        if len(args) == 1:

            self.write("HTTP Error {}".format(args[0]))

        elif len(args) > 1:

            logging.error("HTTP Error {0}: {1}".format(args[0],args[1]))

        elif hasattr(kw,'exc_info'):

            logging.error("HTTP Error: {0}".format(kw['exc_info'][1]))

        else:

            logging.error("HTTP Error: {0}".format(args[0]))


    def shooter(self):

        try:

            while mails:

                data = mails.pop()

                status = self.send(self.gatling_url,auth=self.gatling_key,data=data).status_code

                if status != 200:

                    mails.append(data)
                    break

        except HTTPError as e:

            logging.error("Hmm invalid http response: {}".format(e))

        except (ConnectionError,Timeout):

            pass


    def get(self):

        try:

            self.xsrf_token

        except ValueError:
            pass

        self.render("verdeProd.html")


    async def post(self):

        requestType = self.get_argument('type',default=False)

        if requestType == 'contact':

            name = self.get_argument('name',default="")
            mail = self.get_argument('mail')
            quote = self.get_argument('quote')

            data = {"from": "Verdelectrico mailer <no-reply@gatling.nabla.tech>",
                    "to":"mellado.matias@gmail.com",
                    "subject": "Ha llegado una consulta!",
                    "text": "El usuario %s ha preguntado lo siguiente:\n%s"%(name,quote)
                    }

            mails.append(data)

            self.write(json_encode({"type":"response","status":"success"}));

        elif requestType == 'register':

            cookie = self.get_secure_cookie('vikeProfile')

            if not cookie:

                token = b32encode(os.urandom(32)).decode(errors="ignore")
                token = token.lower().replace('=','')

                dbName = 'vikebookings%s'%token
                policiesName = 'vikepolicies%s'%token

                dbUser = 'vike%s'%token

                dbPass = b32encode(os.urandom(32)).decode(errors="ignore").replace('=','')

                try:

                    server = aiocouchdb.Server(url_or_resource='http://vikeCouchdb:5984/')
                    admin = await server.session.open('vike', 'gyEjUebeW9YE9JAq')

                    usersDB = await server.db('_users')
                    doc = await usersDB.doc(docid="org.couchdb.user:%s"%dbUser)
                    await doc.update({'name':dbUser,'password':dbPass,'type':'user','roles':[]}, auth=admin)

                    bookingsDB = await server.db(dbName)
                    await bookingsDB.create(auth=admin)

                    policiesDb = await server.db(policiesName)
                    await policiesDb.create(auth=admin)

                    repDB = await server.db('_replicator')

                    doc = await repDB.doc(docid=dbName)
                    doc2 = await repDB.doc(docid=policiesName)

                    source = {
                            "headers": {
                                "Authorization": "Basic dmlrZTpneUVqVWViZVc5WUU5SkFx"
                            },
                            "url": "http://vikeCouchdb:5984/%s"%dbName
                    }

                    target  = {
                            "headers": {
                                "Authorization": "Basic dmlrZTpneUVqVWViZVc5WUU5SkFx"
                            },
                            "url": "http://vikeCouchdb:5984/vikebookings"
                    }

                    policiesSource = {
                            "headers": {
                                "Authorization": "Basic dmlrZTpneUVqVWViZVc5WUU5SkFx"
                            },
                            "url": "http://vikeCouchdb:5984/vikepolicies"
                    }

                    policiesTarget  = {
                            "headers": {
                                "Authorization": "Basic dmlrZTpneUVqVWViZVc5WUU5SkFx"
                            },
                            "url": "http://vikeCouchdb:5984/%s"%policiesName
                    }

                    user_ctx = {
                            "name": "vike",
                            "roles": [
                                "_admin",
                                "_reader",
                                "_writer"
                                ]
                    }

                    await doc.update({'source':source,'target':target,'continuous':True,'user_ctx':user_ctx,'owner':'vike'}, auth=admin)
                    await doc2.update({'source':policiesSource,'target':policiesTarget,'continuous':True,'user_ctx':user_ctx,'owner':'vike'}, auth=admin)

                except HttpErrorException as e:

                    logging.error("Mmm error while trying to set DBs replication: %s"%str(e))
                    self.write(json_encode({'type':'error','dbUser':dbUser,'dbPass':dbPass}))

                else:

                    try:

                        await bookingsDB.security.update(auth=admin,admins={'names':[dbUser]},members={'names':[dbUser]})
                        await policiesDb.security.update(auth=admin,admins={'names':[dbUser]},members={'names':[dbUser]})

                        self.set_secure_cookie("vikeProfile", "%s:%s"%(dbUser,dbPass),expires_days=180)
                        self.write(json_encode({'type':'success','dbUser':dbUser,'dbPass':dbPass}))

                    except HttpErrorException as e:

                        logging.error("Mmm error while trying to update DBs security: %s"%str(e))


            else:

                cookie = cookie.decode(errors="ignore").split(':')

                self.write(json_encode({'type':'success','dbUser':cookie[0],'dbPass':cookie[1]}))



if __name__ == '__main__':


    try:

        parser = argparse.ArgumentParser(prog='Vike',description='The electric bike community!')

        settings = {

        "template_path": os.path.join(os.path.dirname(__file__),'../src'),
        "css_path": os.path.join(os.path.dirname(__file__),'../css'),
        "js_path": os.path.join(os.path.dirname(__file__),'../js/'),
        "img_path": os.path.join(os.path.dirname(__file__),'../img'),
        "json_path": os.path.join(os.path.dirname(__file__),'../json'),
        "xsrf_cookies": True,
        "cookie_secret":'jqZ4v&J8AO{xC7c8=0=qlvf!b*~-0UK5#3$)lgBs',
        "compress_response":True,
        "autoescape": "xhtml_escape",
        "default_handler_class": errorHandler,
        "couchdb_credentials":['jpbehler','33579313couchdb'],
        "login_url": "/"
        }

        handlers = [

         (r"/img/(\w.*)", tornado.web.StaticFileHandler, {'path':settings['img_path']}),
         (r"/css/(\w.*)", tornado.web.StaticFileHandler, {'path':settings['css_path']}),
         (r"/js/(\w.*)", tornado.web.StaticFileHandler, {'path':settings['js_path']}),
         (r"/json/(\w.*)", tornado.web.StaticFileHandler, {'path':settings['json_path']}),

        ]

        #Develop i18n
        #tornado.locale.set_default_locale('en_US')
        #tornado.locale.load_translations(os.path.join(os.path.dirname(__file__), "locale"))

        parser.add_argument('-a','--addr',type=str,default=None)
        parser.add_argument('-p','--port',type=int,default=80)

        args = parser.parse_args()

        handlers.append((r"/", booking))
        handlers.append((r"/heart", heart))

        application = tornado.web.Application(handlers, **settings)

        AsyncIOMainLoop().install()

        application.listen(args.port,address=args.addr)

        asyncio.get_event_loop().run_forever()



    except KeyboardInterrupt:

        print("Vike received a SIGINT, exiting...")
        sys.exit(1)
