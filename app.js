'use strict';

var express = require('express'); 
var app = require('./api/gen/src/api/index.js'); 

app.use('/',express.static('app'));

 app.get('/', function(req, res) {
    res.sendfile('./app/index.html');
 });

 // catch 404
app.use((req, res, next) => {
  console.log(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.log(`Error ${status} (${err.message}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: 'Server error' });
});

var appPort = Object.is(process.env.APP_PORT, undefined) ? 8080 : process.env.APP_PORT;

app.listen(appPort); 