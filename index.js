'use strict';

var express = require('express');
var kraken = require('kraken-js');
var fs = require('fs');
var db = require('./libs/dbWarehouse');
var schemaWH = require('./libs/schemaWarehouse');

var options, app;

db.addDB('log', 'localhost', 'auditlog');

fs.readFile('./docs/json_schema.json', function(err, data) {
    if (err) {
        console.error(new Error('"./docs/json_schema.json" could not be loaded'));
    }
    else{
        schemaWH.add('logSchema', JSON.parse(data));
    }
});

fs.readFile('./docs/categoryActions.json', function(err, data) {
    if (err) {
        console.error(new Error('"./docs/categoryActions.json" could not be loaded'));
    }
    else{
        schemaWH.add('logActionMap', JSON.parse(data));
    }
});

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */

        next(null, config);
    }
};

// schemaLib.config();


app = module.exports = express();
app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
