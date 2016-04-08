'use strict';

function IndexModel(t) {

    if (t){
        return {
            name: 'index'
        };
    }
    else{
        return new Error("t is not defined");
    }

};

module.exports = IndexModel;
