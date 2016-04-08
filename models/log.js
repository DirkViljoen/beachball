// requires
var Ajv = require('ajv'),
var q = require('q');
var db = require('../libs/dbWarehouse').getDB('log').getCollection('track');
var schema = require('../libs/schemaWarehouse');

var logModel = function(obj, validation) {
    var deferred = q.defer();
    var ajv = Ajv(); // options can be passed, e.g. {allErrors: true}
    var vldte;
    var validCatActions = {};

    var log; // log object provided by user

    // NV = No Validation
    if (validation == 'NV') {
        // vldte = ajv.compile({});
        log = obj;
        deferred.resolve({
            create: create
        });
    }
    else{
        // load schema & action map
        q.all([
            schema.get('logSchema')
                .then(
                    function(res) {
                        vldte = ajv.compile(res);
                    },
                    function(err) {
                        deferred.reject(err);
                    }
                ),
            schema.get('logActionMap')
                .then(
                    function(res) {
                        validCatActions = res;
                    },
                    function(err) {
                        deferred.reject(err);
                    }
                )
        ])
        .then(
            function() {

                // Validate provided object
                q.all([
                    validateStructure(obj),
                    validateCategoryAction(obj)
                ])
                .then(function (values) {
                    log = obj;
                    deferred.resolve({
                        create: create
                    });
                },function (err) {
                    deferred.reject(err);
                });

            },
            function(err) {
                console.log('initiate fail');
                deferred.reject(err);
            }
        )
    }

    var category = function(val){
        if (val){
            log.category = val;
        }
        else{
            return log.category;
        }
    }
    var id = function(val){}
    var action = function(val){}
    var level = function(val){}
    var timestamp = function(val){}
    var source = function(val){}
    var data = function(val){}


    var create = function() {
        var deferred = q.defer();

        if (log) {
            log.timestamp = new Date().getTime();
            if (!log.level) {
                log.level = 3;
            }

            db.insert(log);
            // console.log('dbs: '/*, db.getDB('log').getCollection('log')*/);
            deferred.resolve(true);
        }
        else {
            deferred.reject(new Error('Object to log is not defined'))
        }

        return deferred.promise;
    };

    /*Determines if the provided object is in the required format. Returns a promise which is resolved to true or rejected with an error.*/
    var validateStructure = function(obj) {
        var deferred = q.defer();

        if (vldte(obj) == true) {
            deferred.resolve(true);
        }
        else{
            var datapath = 'object';
            if (vldte.errors[0].dataPath.length > 0) {
                datapath = vldte.errors[0].dataPath.slice(1);
            }

            err = new Error('Invalid ' + datapath + ' - ' + vldte.errors[0].message);
            deferred.reject(err);
        }

        return deferred.promise;
    };

    /*Determines if the provided category and action is mapped in the provided json file during config. Returns a promise which is resolved with true, or rejected with an error.*/
    var validateCategoryAction = function(obj) {
        var deferred = q.defer();

        try {
            if (validCatActions[obj.category].indexOf(obj.action) >= 0) {
                deferred.resolve(true);
            }
            else {
                // console.log('action not found');
                throw new error('Invalid');
            }
        }
        catch(err) {
            err = new Error('Invalid category action - The action is not available for the provided category');
            deferred.reject(err);
        }

        return deferred.promise;
    };

    return deferred.promise;

};

module.exports = logModel;
