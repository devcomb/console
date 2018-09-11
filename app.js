'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('app'));
app.get('/', function(req, res) {
    res.sendfile('./app/index.html');
});

const expressOasGenerator = require('express-oas-generator');
expressOasGenerator.init(app, {});

app.listen(5000);