// requires
var Ajv = require('ajv'),
    q = require('q');

// global variables
var ajv = Ajv(); // options can be passed, e.g. {allErrors: true}
var vldte;
var validCatActions = {};

var log = function() {

    function validateObj(obj) {
        var deferred = q.defer();

        q.all([
            validateStructure(obj),
            validateCategoryAction(obj)
        ])
        .then(function (values) {
            deferred.resolve(true);
        },function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    function validateStructure(obj) {
        var deferred = q.defer();

        if (vldte(obj) == true){
            deferred.resolve(true);
        }
        else{
            var datapath = 'object';
            if (vldte.errors[0].dataPath.length > 0){
                datapath = vldte.errors[0].dataPath.slice(1);
            }

            err = new Error('Invalid ' + datapath + ' - ' + vldte.errors[0].message);
            deferred.reject(err);
        }

        return deferred.promise;
    };

    /*
    Determines if the provided category and action is mapped in the provided json file during config. Returnes a promise which is resolved with true, or rejected with an error.
    */
    function validateCategoryAction(obj) {
        var deferred = q.defer();

        try {
            if (validCatActions[obj.category].indexOf(obj.action) > 0) {
                deferred.resolve(true);
            }
            else {
                throw new error('Invalid');
            }
        }
        catch(err){
            err = new Error('Invalid category action - The action is not available for the provided category');
            deferred.reject(err);
        }

        return deferred.promise;
    };

    function config(schema, catActions) {
        vldte = ajv.compile(schema);
        validCatActions = catActions;
    };

    return {
        validate: validateObj,
        config: config
    };
};

module.exports = log();
