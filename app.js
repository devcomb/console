'use strict';

const wafflesImplementation = require('./examples/controllers/waffles');

// simple express server
var express = require('express'); 
var app = express();
var router = express.Router();

app.use(express.static('app'));

app.get('/', function(req, res) {
    res.sendfile('./app/index.html');
});
console.log("test1");

app.get('/waffles/', wafflesImplementation.getWaffleList);

console.log("test2");

app.listen(5000); 