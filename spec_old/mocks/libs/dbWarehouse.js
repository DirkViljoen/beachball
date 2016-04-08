/**
 * A custom library to establish a database connection
 */
'use strict';



var db = function () {
    var dbs = {};

    function addDB(name, host, database, username, password) {
        console.log(name);
        dbs[name] = {};
    };

    function getDB(name) {
        if (dbs.length == 0){
            console.error(new Error('Empty database warehouse'));
            throw new Error('Empty database warehouse');
        }

        if (dbs[name]){
            dbs[name].getCollection = getCollection(name);
            return dbs[name]
        }
        else{
            throw new Error('DB does not exist');
        }
    }

    function getCollection(database) {
        return function(collection){
            console.log('** db name:', database);
            if (!database) {
                console.log('** col name:', collection);
            }

            if (dbs.length == 0){
                console.error(new Error('Empty database warehouse'));
                throw new Error('Empty database warehouse');
            }

            if (database){
                return dbs[database].collection(collection);
            }
            else{
                return dbs[Object.keys(dbs)[0]].collection(collection);
            }
        }
    }

    return{
        addDB: addDB,
        getDB: getDB,
        getCollection: getCollection
    };
};

module.exports = db();

