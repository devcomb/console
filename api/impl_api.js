/*
 * devcomb-console
 * https://github.com/devcomb/console
 *
 * Copyright (c) 2018 James Drummond
 * Licensed under the Eclipse, Public, License, -, v, 2.0 licenses.
 */
 
const util = require('util');
const yamlDir = __dirname+'/gen/config/';

//console.log(`json=${json}.`);
function getJson(yamlFile) {
    var inputfile = yamlDir+yamlFile;
    var yaml = require('js-yaml');
    var fs = require('fs');
    var obj = yaml.load(fs.readFileSync(inputfile, {encoding: 'utf-8'}));
    var json = JSON.stringify(obj);
    return json;
};

module.exports.getSideNavMenus = function(options) {
    var json = getJson('menu-section-left.yml');
    console.log( "API call to getSideNavMenus returned: " + json );
    return json;
};

module.exports.getSideNavRightMenus = function(options) {
    var json = getJson('menu-section-right.yml');
    console.log( "API call to getSideNavRightMenus returned: " + json );
    return json;
};

module.exports.getHeaderMenus = function(options) {
    var json = getJson('menu-header.yml');
    console.log( "API call to getHeaderMenus returned: " + json );
    return json;
};

module.exports.getAction = function(options) {
    return json;
};


