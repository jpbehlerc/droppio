#!/usr/bin/python3.5

import tornado.web
import tornado.auth
from tornado.auth import AuthError
from tornado.web import HTTPError, MissingArgumentError, authenticated
from tornado.gen import coroutine
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
from hashlib import sha224
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError
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

logging.basicConfig(format='Droppio [%(levelname)s][%(asctime)s]:  %(message)s', stream=sys.stdout, datefmt='%m-%d-%Y %I:%M:%S %p')
faulthandler.enable(file=open('/var/log/droppio.debug',mode='a'))

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


class landing(tornado.web.RequestHandler):

    def initialize(self):

        self.gatling_url = "https://api.mailgun.net/v3/gatling.nabla.tech/messages"
        self.gatling_key = ("api", "key-ab4d563107f353b01e48937a9e6f934a")
        self.send = requests.post

    def write_error(self,*args,**kw):

        if len(args) == 1:

            self.write("HTTP Error {}".format(args[0]))

        elif len(args) > 1:

            logging.error("HTTP Error {0}: {1}".format(args[0],args[1]))

        elif hasattr(kw,'exc_info'):

            logging.error("HTTP Error: {0}".format(kw['exc_info'][1]))

        else:

            logging.error("HTTP Error: {0}".format(args[0]))


    def get(self):

        try:

            self.xsrf_token

        except ValueError:
            pass

        self.render("website.html")


class register(tornado.web.RequestHandler):

    def get(self):

        self.render("signup.html")

    async def post(self):

        requestType = self.get_argument('type',default=False)
        requestType = requestType if requestType == 'signup' or requestType == 'login'  else False

        #captcha = self.get_argument('g-recaptcha-response',default=False)
        #captcha = captcha if type(captcha) == str and len(captcha) > 30 else False

        email = self.get_argument('email',default=False)

        dbAdminUser = self.settings['db']['user']
        dbAdminPass = self.settings['db']['pass']

        if requestType=='login':

            pwd = self.get_argument('pass',default=False)
            ip = self.request.headers.get("X-Real-Ip")

            if email and pwd:

                try:

                    #Authenticate to couchDB service
                    server = aiocouchdb.Server(url_or_resource='http://192.168.131.173:5489/')
                    admin = await server.session.open(dbAdminUser, dbAdminPass)

                    sha = sha224()

                    token = await loop.run_in_executor(None,sha224,email.encode())

                    settingsDB = await server.db('settings%s'%token.hexdigest())
                    doc = await settingsDB["password"].get()
                    pwd = doc["hash"]

                    ph = PasswordHasher()

                    await loop.run_in_executor(None,ph.verify,doc['hash'],pwd)

                    dbUser = "droppio%s"%token
                    dbPass = "%s%s"%(token,self.settings['salt'])

                except VerificationError:

                    logging.error("Mmm.. failed login attempt from ip %s and user %s"%(ip,email))
                    self.write(json_encode({'type':'error'}))

                except HttpErrorException as e:

                    logging.error("Mmm error while trying to get settings DBs: %s"%str(e))
                    self.write(json_encode({'type':'error'}))

                else:

                    self.set_secure_cookie("droppioSession", "%s:%s"%(dbUser,dbPass),expires_days=365)
                    self.write(json_encode({'type':'success'}))


        elif requestType=='signup':

            name = self.get_argument('name',default=False)
            lastname = self.get_argument('lastname',default=False)
            bloodType = self.get_argument('bloodType',default=False)

            if name and lastname and bloodType and email:

                token = sha224(email.encode()).hexdigest()

                dbUser = 'droppio%s'%token
                dbPass = "%s%s"%(token,self.settings['salt'])

                settingsName = 'settings%s'%token
                statsName = 'stats%s'%token
                campaignsName = 'campaigns'

                print(dbUser,dbPass)
                print(settingsName,statsName,campaignsName)

                try:

                    #Authenticate to couchDB service
                    server = aiocouchdb.Server(url_or_resource='http://192.168.131.173:5489/')
                    admin = await server.session.open(dbAdminUser, dbAdminPass)

                    print("creating user")
                    #Create new couchDB user
                    usersDB = await server.db('_users')
                    doc = await usersDB.doc(docid="org.couchdb.user:%s"%dbUser)
                    await doc.update({'name':dbUser,'password':dbPass,'type':'user','roles':[]}, auth=admin)

                    print("creating settings")
                    #Create and update security on settingsDB
                    settingsDB = await server.db(settingsName)
                    await settingsDB.create(auth=admin)
                    await settingsDB.security.update(auth=admin,admins={'names':[dbUser]},members={'names':[dbUser]})


                    print("creating stats")
                    #Create and update security on user's statsDB
                    statsDB = await server.db(statsName)
                    await statsDB.create(auth=admin)
                    await statsDB.security.update(auth=admin,admins={'names':[dbUser]},members={'names':[dbUser]})


                except HttpErrorException as e:

                        logging.error("Mmm error while trying to set user's DBs: %s"%str(e))
                        self.write(json_encode({'type':'error'}))

                else:

                    self.set_secure_cookie("droppioSession", "%s:%s&%s:%s"%(dbUser,dbPass,dbAdminUser,dbAdminPass),expires_days=365)
                    self.write(json_encode({'type':'success'}))


class home(tornado.web.RequestHandler):

    def get_current_user(self):

        self.cookie = self.get_secure_cookie('droppioSession')
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


    @authenticated
    def get(self):

        if not self.current_user:

            self.redirect("/register")
            return

        self.render("home.html")


    @authenticated
    def post(self):

        requestType = self.get_argument('type',default=False)
        requestType = requestType if requestType == 'creds' else False

        user,admin = tornado.escape.xhtml_escape(self.current_user).split("&")

        user = user.split(':')
        dbUser = user[0]
        dbPass = user[1]

        admin = admin.split(':')
        dbAdminUser = admin[0]
        dbAdminPass = admin[1]

        self.write(json_encode({'type':'creds','dbUser':dbUser,'dbPass':dbPass, 'dbAdminUser':dbAdminUser, 'dbAdminPass':dbAdminPass}))


class profile(tornado.web.RequestHandler):

    def get(self):

        self.render("profile.html")

class campaign(tornado.web.RequestHandler):

    def get(self):

        try:

            self.xsrf_token

        except ValueError:
            pass

        self.render("campaign.html")


if __name__ == '__main__':


    try:

        parser = argparse.ArgumentParser(prog='Droppio',description='Webapp de campañas de sangre')

        settings = {

        "template_path": os.path.join(os.path.dirname(__file__),'../html'),
        "css_path": os.path.join(os.path.dirname(__file__),'../css'),
        "js_path": os.path.join(os.path.dirname(__file__),'../js/'),
        "img_path": os.path.join(os.path.dirname(__file__),'../img'),
        "json_path": os.path.join(os.path.dirname(__file__),'../json'),
        "xsrf_cookies": True,
        "cookie_secret":'jqZ4v&J8AO{xC7c8=0=qlvf!b*~-0UK5#3$)lgBs',
        "compress_response":True,
        "autoescape": "xhtml_escape",
        "default_handler_class": errorHandler,
        "db": {'user':'droppio','pass':'SjDdtbDUWDxqwid4'},
        "login_url": "/register",
        "salt": '4479bcb7167644f8c288bc604a87ec79'
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

        handlers.append((r"/home", home))
        handlers.append((r"/", landing))
        handlers.append((r"/register", register))
        handlers.append((r"/campaign", campaign))
        handlers.append((r"/profile", profile))
        handlers.append((r"/heart", heart))

        application = tornado.web.Application(handlers, **settings)

        AsyncIOMainLoop().install()

        application.listen(args.port,address=args.addr)

        asyncio.get_event_loop().run_forever()



    except KeyboardInterrupt:

        print("Droppio received a SIGINT, exiting...")
        sys.exit(1)
