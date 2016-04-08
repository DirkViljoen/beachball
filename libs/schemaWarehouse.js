/**
 * A custom library to establish a database connection
 */
'use strict';
var q = require('q');

var documentManager = function () {
    var schemas = {};

    function addSchema(name, obj) {
        var deferred = q.defer();

        if (obj){
            schemas[name] = obj;
            console.log('Schema added:', name);
            deferred.resolve(true);
        }
        else{
            deferred.reject(new Error('Object not provided'));
        }

        return deferred.promise;
    };

    function getSchema(name) {
        var deferred = q.defer();

        if (schemas[name]){
            deferred.resolve(schemas[name]);
        }
        else{
            deferred.reject(new Error('Schema does not exist'));
        }

        return deferred.promise;
    }

    return{
        add: addSchema,
        get: getSchema
    };
};

module.exports = documentManager();
