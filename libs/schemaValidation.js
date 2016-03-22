/**
 * A custom library for schema validation
 */
'use strict';
var fs = require('fs');
var Ajv = require('ajv');
var ajv = Ajv(); // options can be passed, e.g. {allErrors: true}
var logSchema;
var validate;

var validation = function () {

    function validate(input){
        if (validate(input)) {
            return true;
        }
        else{
            // console.log(validate.errors);
            return validate.errors;
        }
    };

    /**
     * Load json schema in memory
     */
    function config() {
        logSchema = JSON.parse(fs.readFileSync('./docs/json_schema.js', 'utf8'));
        validate = ajv.compile(logSchema);
    };

    return {
        validate: validate,
        config: config
    }
};

module.exports = validation();
