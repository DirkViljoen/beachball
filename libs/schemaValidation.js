/**
 * A custom library for schema validation
 */
'use strict';
var Ajv = require('ajv');
var ajv = Ajv(); // options can be passed, e.g. {allErrors: true}
var logSchema;
var validate;

var validation = function () {
    return {
        validate: function (input){
            if (validate(input)) {
                return true;
            }
            else{
                // console.log(validate.errors);
                return validate.errors;
            }
        },


        /**
         * Load json schema in memory
         */
        config: function () {
            var fs = require('fs');
            logSchema = JSON.parse(fs.readFileSync('./docs/json_schema.js', 'utf8'));
            validate = ajv.compile(logSchema);
        }
    };
};

module.exports = validation();
