/**
 * A custom library to establish a database connection
 */
'use strict';
var q = require('q');

var mongo = require('mongodb');
var mongoDb = mongo.Db;
var mongoServer = mongo.Server;

var db = function () {
    var dbs = {};

    function addDB(name, host, database, username, password) {
        var deferred = q.defer();

        var db = new mongoDb(database, new mongoServer(host, 27017));
        // Establish connection to db
        db.open(function(err, db) {
            if (err) {
                console.error(err);
                deferred.reject(err);
            }
            dbs[name] = db;
            console.log('db added:', name);
            deferred.resolve(true);
        });

        return deferred.promise;
    };

    function getDB(name) {
        // var deferred = q.defer();

        if (dbs == {}) {
            console.error(new Error('Empty database warehouse'));
            // deferred.reject(new Error('Empty database warehouse'));
            return new Error('Empty database warehouse');
        }

        if (dbs[name]) {
            dbs[name].getCollection = getCollection(name);
            // deferred.resolve(dbs[name]);
            return dbs[name];
        }
        else{
            // deferred.reject(new Error('DB does not exist'));
            throw new Error('DB does not exist');
        }

        // return deferred.promise;
    }

    function getCollection(database) {
        return function(collection) {
            var deferred = q.defer();
            console.log('** db name:', database);

            if (!database) {
                console.log('** col name:', collection);
            }

            if (dbs == {}) {
                console.error(new Error('Empty database warehouse'));
                deferred.reject(new Error('Empty database warehouse'));
            }

            if (database) {
                deferred.resolve(dbs[database].collection(collection));
            }
            else{
                deferred.resolve(dbs[Object.keys(dbs)[0]].collection(collection));
            }

            return deferred.promise;
        }
    }

    return{
        addDB: addDB,
        getDB: getDB,
        getCollection: getCollection
    };
};

module.exports = db();

// var db1 = require('../../mongo').getDB('logServer');
// var users = db.getCollection('log');
// var jobs = db.getCollection('jobs');

