var log = require('../models/log'),
    krj = require('karma-read-json');

var logSchema = krj.readJSON('docs/json_schema.json');
var catActions = krj.readJSON('docs/categoryActions.json');
log.config(logSchema, catActions);

testObject = {
    "category": "candidate",
    "action": "shortlist",
    "level": 1,
    "id": "901234",
    "source": "People Bank",
    "data": {
        "type": "crim",
        "user": {
            "id": "12",
            "name": "Dirk Viljoen"
        },
        "client": {
            "id": "9",
            "name": "Coca-cola"
        }
    }
}

describe("Log schema validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should be able to accept a valid json object", function () {
        expect(err).not.toBeDefined();
        expect(res).toEqual(true);
    });

});

describe("Log schema validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = {};

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject an invalid json object", function () {
        expect(res).not.toBeDefined();
        expect(err.message).toEqual('Invalid structure');
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.category = 'qwerty';

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject invalid categories", function () {
        expect(res).not.toBeDefined();
        expect(err.message).toEqual('Invalid data');
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.action = 'qwerty';

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject invalid actions", function () {
        expect(res).not.toBeDefined();
        expect(err.message).toEqual('Invalid data');
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.level = 0;

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject invalid levels", function () {
        expect(res).not.toBeDefined();
        expect(err.message).toEqual('Invalid data');
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.source = 'qwerty';

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject invalid sources", function () {
        expect(res).not.toBeDefined();
        expect(err.message).toEqual('Invalid data');
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.data =  {"user": {
                            "id": "12"
                        }};

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject invalid user data", function () {
        expect(res).not.toBeDefined();
        expect(err.message).toEqual('Invalid structure');
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.data =  {"job": {
                            "id": "12"
                        }};

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject invalid job data", function () {
        expect(res).not.toBeDefined();
        expect(err.message).toEqual('Invalid structure');
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.data =  {"client": {
                            "id": "12"
                        }};

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject invalid client data", function () {
        expect(res).not.toBeDefined();
        expect(err.message).toEqual('Invalid structure');
    });

});

describe("log data validation -", function() {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.category = 'candidate';
        testObj.action = 'post';

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("should only accept mapped category actions", function() {
        expect(res).not.toBeDefined();
        expect(err.message).toEqual('Invalid data');
    });

});
