'use strict';

//const wafflesImplementation = require('./implementation/examples/waffle-maker/controllers/waffles');

// simple express server
var express = require('express'); 
var app = express();
var router = express.Router();

app.use(express.static('app'));

app.get('/', function(req, res) {
    res.sendfile('./app/index.html');
});

//app.get('/waffles/', wafflesImplementation.getWaffleList(req, res));

app.listen(5000);