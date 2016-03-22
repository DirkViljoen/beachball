// requires
var Ajv     = require('ajv'),
    q       = require('q');

// global vars
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
            switch(vldte.errors[0].keyword) {
                case 'required':
                    err = new Error('Invalid structure')
                    err.data = 'Invalid ' + vldte.errors[0].dataPath.slice(1) + ' - ' + vldte.errors[0].message;
                    break;
                default:
                    err = new Error('Invalid data')
                    err.data = 'Invalid ' + vldte.errors[0].dataPath.slice(1) + ' - ' + vldte.errors[0].message;
            };

            deferred.reject(err);
        }

        return deferred.promise;
    };

    function validateCategoryAction(obj) {
        var deferred = q.defer();

        try {
            if (validCatActions[obj.category].indexOf(obj.action) < 1) {
                err = new Error('Invalid data');
                err.data = 'Invalid category action - The action is not available for the provided category';
                deferred.reject(err);
            }
            else {
                deferred.resolve(true);
            }
        }
        catch(err){
            err = new Error('Invalid data');
            err.data = 'Invalid category - category does not exist';
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
