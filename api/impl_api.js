/*
 * devcomb-console
 * https://github.com/devcomb/console
 *
 * Copyright (c) 2018 James Drummond
 * Licensed under the Eclipse, Public, License, -, v, 2.0 licenses.
 */
 
const util = require('util');
var inputfile = __dirname+'/gen/config/menu-section-left.yml';
var yaml = require('js-yaml');
var fs = require('fs');
var obj = yaml.load(fs.readFileSync(inputfile, {encoding: 'utf-8'}));
var json = JSON.stringify(obj);
console.log(`json=${json}.`);

module.exports.getSideNavMenus = function(options) {
    return json;
};
