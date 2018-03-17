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

class home(tornado.web.RequestHandler):

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

        self.render("home.html")


class landing(tornado.web.RequestHandler):


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

class connect(tornado.web.RequestHandler):

    def get(self):

        self.render("connect.html")

class campaign(tornado.web.RequestHandler):

    def get(self):

        try:

            self.xsrf_token

        except ValueError:
            pass

        self.render("campaign.html")


if __name__ == '__main__':


    try:

        parser = argparse.ArgumentParser(prog='Droppio',description='The electric bike community!')

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

        handlers.append((r"/home", home))
        handlers.append((r"/", landing))
        handlers.append((r"/campaign", campaign))
        handlers.append((r"/connect", connect))
        handlers.append((r"/heart", heart))

        application = tornado.web.Application(handlers, **settings)

        AsyncIOMainLoop().install()

        application.listen(args.port,address=args.addr)

        asyncio.get_event_loop().run_forever()



    except KeyboardInterrupt:

        print("Droppio received a SIGINT, exiting...")
        sys.exit(1)
