'use strict';

// simple express server
var express = require('express'); 
var app = express();
var router = express.Router();

app.use(express.static('app'));

app.get('/', function(req, res) {
    res.sendfile('./app/index.html');
});


var appPort = Object.is(process.env.APP_PORT, undefined) ? 8080 : process.env.APP_PORT;

app.listen(appPort); 