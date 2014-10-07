// core
var http = require('http')
var path = require('path')

// npm
var express = require('express')
var mongodb = require('mongodb')
var conniePage = require('../')

// connect to MongoDB
log('Connecting to MongoDB...')
mongodb.MongoClient.connect('mongodb://localhost:27017/connie', function(err, db) {
  if (err) throw err

  log('Connected to MongoDB')

  var app = express()
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'jade')
  app.enable('trust proxy')

  app.locals.pretty = true

  app.use('/', conniePage({
    express  : express,
    db       : db,
    pageCol  : db.collection('pages'),
    title    : 'Welcome',
  }))

  var server = http.createServer()
  server.on('request', app)

  var port = 8240
  log('Listening on port %s ...', port)
  server.listen(port, function(err) {
    if (err) throw err
    log('Listened on port %s', port)
  })
})

// simple logger to prepend the date
function log(str) {
  var args = Array.prototype.slice.call(arguments, 0)
  args[0] = (new Date()).toISOString() + ' - ' + args[0]
  console.log.apply(console, args)
}
