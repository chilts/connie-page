# connie-forum #

Content pages for Connie, a Content Management System (CMS).

## Synopsis ##

```
var http = require('http')
var path = require('path')
var express = require('express')
var mongodb = require('mongodb')
var conniePage = require('connie-page')

MongoClient.connect(cfg.mongodb, function(err, db) {

  var app = express()
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'jade')

  app.use('/', conniePage({
    express  : express,
    db       : db,
    pageCol  : db.collection('pages-home'),
    title    : 'Welcome',
  }))

  var server = http.createServer()
  server.on('request', app)

  var port = 8080
  server.listen(port, function(err) {
    if (err) throw err
    console.log('Listening on port %s', port)
  })
})
```

This entire program now means that you can serve a set of pages at `/` which come
from the `pages-home` collection in MongoDB.

To add another set of pages (e.g. a help section) try the following:

```
  app.use('/help', conniePage({
    express  : express,
    db       : db,
    pageCol  : db.collection('pages-help'),
    title    : 'Help',
  }))
```

As you can see, to add new sections is pretty easy.

## LICENSE ##

Copyright 2014 Andrew Chilton <andychilton@gmail.com>.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

(Ends)
