const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../lib/config');
const logger = require('../lib/logger');

const log = logger(config.logger);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
 * Routes
 */
{{#each @root.openapi.endpoints}}
{{#endsWith @root.openapi.basePath '/'}}
app.use('{{@root.openapi.basePath}}{{..}}', require('./routes/{{..}}'));
{{else}}
app.use('{{@root.openapi.basePath}}/{{..}}', require('./routes/{{..}}'));
{{/endsWith}}
{{/each}}

module.exports = app;
