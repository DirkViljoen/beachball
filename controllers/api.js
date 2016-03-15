'use strict';

var ApiModel = require('../models/api');
var schemaLib = require('../libs/schemaValidation');

module.exports = function (router) {

    var model = new ApiModel();

    router.get('/', function (req, res) {

        res.send('<code><pre>' + JSON.stringify("Hello", null, 2) + '</pre></code>');

    });

    router.post('/log', function (req, res) {
        var result = schemaLib.validate(req.body);
        console.log(result);
        if (result == true){
            res.send('<code><pre>' + JSON.stringify({result:'success'}, null, 2) + '</pre></code>');
        }
        else{
            res.send('<code><pre>' + JSON.stringify({result:result}, null, 2) + '</pre></code>');
        }


    });

};
