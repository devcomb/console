'use strict';

var express = require('express'); 
const path = require('path');
const http = require('http');
// var app = require('./api/gen/src/api/api.js'); 
const exegesisExpress = require('exegesis-express');

const options = {
    controllers: path.resolve(__dirname, './controllers'),
    allowMissingControllers: false
};

const exegesisMiddleware = await exegesisExpress.middleware(
    path.resolve(__dirname, './openapi.yaml'),
    options
);

const app = express();

// app.use(exegesisMiddleware);

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

var appPort = Object.is(process.env.APP_PORT, undefined) ? 8081 : process.env.APP_PORT;

app.listen(appPort); 
