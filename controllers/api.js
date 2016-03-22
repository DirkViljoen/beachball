'use strict';

var LogModel = require('../models/log');
var fs = require('fs');

function(){
    var schema = {},
        categoryActions = {};

    fs.readFile('./docs/json_schema.json', function(err, data) {
        if (err) {
            throw err;
        }

        schema = JSON.parse(data);
    });

    fs.readFile('./docs/categoryActions.json', function(err, data) {
        if (err) {
            throw err;
        }

        categoryActions = JSON.parse(data);
    });

    LogModel.config(schema, categoryActions);
}


module.exports = function (router) {

    // var model = new LogModel();

    router.get('/', function (req, res) {

        res.send('<code><pre>' + JSON.stringify("Hello", null, 2) + '</pre></code>');

    });

    router.post('/log', function (req, res) {
        var result = LogModel.validate(req.body);
        res.send('<code><pre>' + JSON.stringify(result, null, 2) + '</pre></code>');
    });

};
