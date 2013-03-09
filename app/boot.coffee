#!/usr/bin/env coffee

#adapted fromn:
# A simple static-file web server implemented as a stand-alone Node.js/CoffeeScript app.
#---------------------------------------------------------------------
# For more information, see:
#   <https://github.com/rodw/tiny-node.js-webserver>
#---------------------------------------------------------------------
# This program is distributed under the "MIT License".
# (See <http://www.opensource.org/licenses/mit-license.php>.)
#---------------------------------------------------------------------
# Copyright (c) 2012 Rodney Waldhoff
#
# Permission is hereby granted, free of charge, to any person
# obtaining a copy of this software and associated documentation
# files (the "Software"), to deal in the Software without restriction,
# including without limitation the rights to use, copy, modify, merge,
# publish, distribute, sublicense, and/or sell copies of the Software,
# and to permit persons to whom the Software is furnished to do so,
# subject to the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
# OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
# BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
# ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
# CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#---------------------------------------------------------------------

# # Import the Node.js modules we'll need.
path = require 'path'
http = require 'http'
fs   = require 'fs'
nStore = require 'nstore'
nStore = nStore.extend(require('nstore/query')())
db = nStore.new 'kaotec.json', ()->
  console.log("db is loaded")
# Haml = require 'haml'
jade = require 'jade'




# # Setup MIME support.

# `MIME_TYPES` is a rudimentary extension-to-MIME-type mapping:
MIME_TYPES = {
  'css'  :'text/css',
  'gif'  :'image/gif',
  'htm'  :'text/html',
  'html' :'text/html',
  'ico'  :'image/x-icon',
  'jpeg' :'image/jpeg',
  'jpg'  :'image/jpeg',
  'js'   :'text/javascript',
  'json' :'application/json',
  'png'  :'image/png',
  'txt'  :'text/text',
}

# `get_mime` returns the MIME type corresponding to the given `filename`.
# (Or `null` when no mapping is found.)
get_mime = (filename)->
  for ext,type of MIME_TYPES
    if filename.indexOf(ext, filename.length - ext.length) != -1
      return type
  return null


# # Parse command line arguments, if any.

options = {}

expect_value = (array,prefix)->
  if array.length==0
    console.warn "WARNING: Expected a value following \"#{prefix}\""
    return null
  else
    return array.shift()

args = process.argv
args.shift()
args.shift()
while args.length > 0
  switch val = args.shift()
    when '--port','-p' then options.port = expect_value args, val
    when '--host','-h' then options.host = expect_value args, val
    when '--index','-i' then options.index = expect_value args, val
    when '--docroot','-d' then options.docroot = expect_value args, val
    when '--mime-type','-m' then MIME_TYPES[expect_value(args, val)] = expect_value(args, val)
    when '--quiet','-q' then options.quiet = true
    when '--silent','-s' then options.silent = true
    else
      console.warn "WARNING: The option \"#{val}\" is not recognized."

# # Set defaults, if not otherwise specified.

options.host ?= 'localhost'
#options.host ?= '10.100.10.133'
options.port ?= 8080
options.index ?= 'index.html'
options.docroot ?= '.'
options.quiet ?= false
options.silent ?= false
options.quiet = true if options.silent

# # Create and launch the server itself.

# `respond` returns the specfied `content` over HTTP, using the given
# `status` code and `content_type`.
respond = (request,response,status=200,content=null,content_type=null)->
  options.quiet || console.log "#{status}\t#{request.method}\t#{request.url}"
  response.writeHead status, "Content-Type":content_type
  response.write content if content?
  response.end()

serve_file = (request,response,requestpath)->
  fs.readFile requestpath, (error, content)->
    if error?
      console.error "ERROR: Encountered error while processing #{request.method} of \"#{request.url}\".",error
      respond request, response, 500
    else
      respond request, response, 200, content, get_mime(requestpath)

# `request_handler` processes a single HTTP request.
request_handler = (request,response)->
  if request.url.match(/((\.|%2E|%2e)(\.|%2E|%2e))|(~|%7E|%7e)/)? # look for `..` or `~`
    options.quiet || console.warn "WARNING: #{request.method} of \"#{request.url}\" rejected as insecure."
    respond request, response, 403
  else
    requestpath = path.normalize( path.join(options.docroot, request.url) )
    path.exists requestpath, (file_exists)->
      if file_exists
        fs.stat requestpath, (err,stat)->
          if err?
            console.error "ERROR: Encountered error calling fs.stat on \"#{requestpath}\" while processing #{request.method} of \"#{request.url}\".",err
            respond request, response, 500
          else
            if stat? && stat.isDirectory()
              requestpath += "/" unless requestpath.substr(-1) == '/'
              requestpath += options.index
              path.exists requestpath, (file_exists)->
                if file_exists
                  serve_file request,response, requestpath
                else
                  respond request, response, 404
            else
              serve_file request,response, requestpath
      else if request.url.split('/')[1] == "db"
        dbcommand = request.url.split('/')
        console.log('do something dirty' + dbcommand[3])
        if dbcommand[2]='set'
        #   # temp = db.get dbcommand[3]
          db.save dbcommand[3],
            eyes: dbcommand[5]
          ,(err) ->
            throw err if err
        #     # dbcommand[4]: "\""+dbcommand[5]+"\""
        #   # db.forEach (key, value) ->
        #   #   console.log "Found key: #{key}, val: %j", value
        if dbcommand[2]='get'
          db.find "brand":"kaosbeat",(err,results)->
            render_jade request, response, "index", results
            # console.log results
      else
        respond request, response, 404

  # io.sockets.on "connection", (socket) ->
  #   socket.emit "news",
  #     hello: "world"


# render_haml = (request, response, file, data)->
render_jade = (request, response, file, data)->
  layout = jade.compile(fs.readFileSync('layout/'+file+'.jade', 'utf8'))
  console.log layout
  html = layout data
  # data = 
  #   bert: 
  #     brand: 'kaosbeat',
  #     title: 'redsynth',
  #     year: 2007,
  #     tags: 'synth,555,arduino',
  #     img: 'redsynth1.jpg,redsynth2.jpg,redsynth3.jpg',
  #     status: 'broken'
  #   robs: 
  #     brand: 'kaosbeat',
  #     title: 'ballsynth',
  #     year: 2008,
  #     tags: 'synth,custom',
  #     img: 'ballsynth1.jpg',
  #     status: 'broken'
  hdata = 
    title: "Hello Node",
    contents: "<h1>Hello World</h1>"
  console.log data
  # html = Haml.render(haml, locals: data)
  respond request, response, 200, html


# # `server` is the HTTP server itself. with sockets enabled
server = http.createServer request_handler
# io = require('socket.io').listen(server)
# db.on "load", ->    

# db.find
#   eyes: "purple", (err, results)->
#   console.log "blaqh"
#     db.forEach (key, value) ->
#       console.log "Found key: #{key}, val: %j", value
server.listen options.port, options.host,()->
  options.silent || console.log "Server listening at http://#{options.host}:#{options.port}/"
  
  
