'use strict';

var logModel = require('../models/log');
var q = require('q');

// LogModel.config(schema, categoryActions);

module.exports = function (router) {

    router.get('/', function (req, res) {

        res.send('<code><pre>' + JSON.stringify("Please refer to documentation for valid api calls.", null, 2) + '</pre></code>');

    });

    router.post('/log', function (req, res) {
        var log;
        var result;

        logModel(req.body)
            .then(
                function(value){
                    log = value;

                    log.create()
                        .then(
                            function(value){
                                res.send('<code><pre>' + JSON.stringify('Success', null, 2) + '</pre></code>');
                            },
                            function(err){
                                res.send('<code><pre>' + JSON.stringify(err.message, null, 2) + '</pre></code>');
                            }
                        )
                },
                function(err){
                    res.send('<code><pre>' + JSON.stringify(err.message, null, 2) + '</pre></code>');
                }
            );

    });

};
