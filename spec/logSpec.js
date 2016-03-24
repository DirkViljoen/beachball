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

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = {
            // "category": "candidate",
            "action": "post",
            "level": 1,
            "id": "901234",
            "source": "People Bank"
        };

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject if category is not present", function () {
        expect(res).not.toBeDefined();
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid object - should have required property 'category'");
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid category - should be equal to one of the allowed values");
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = {
            "category": "candidate",
            // "action": "post",
            "level": 1,
            "id": "901234",
            "source": "People Bank"
        };

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject if action is not present", function () {
        expect(res).not.toBeDefined();
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid object - should have required property 'action'");
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid action - should be equal to one of the allowed values");
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = {
            "category": "job",
            "action": "post",
            // "level": 1,
            "id": "901234",
            "source": "People Bank"
        };

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject if level is not present", function () {
        expect(res).not.toBeDefined();
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid object - should have required property 'level'");
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid level - should be >= 1");
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.level = 6;

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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid level - should be <= 5");
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = {
            "category": "job",
            "action": "post",
            "level": 1,
            // "id": "901234",
            "source": "People Bank"
        };

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject if id is not present", function () {
        expect(res).not.toBeDefined();
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid object - should have required property 'id'");
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = {
            "category": "job",
            "action": "post",
            "level": 1,
            "id": "901234",
            // "source": "People Bank"
        };

        log.validate(testObj)
            .then(function (result) {
                res = result;
                done();
            }, function (error) {
                err = error;
                done();
            });
    });

    it("Should reject if source is not present", function () {
        expect(res).not.toBeDefined();
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid object - should have required property 'source'");
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid source - should be equal to one of the allowed values");
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid data.user - should have required property 'name'");
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.data =  {"user": {
                            "name": "12"
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid data.user - should have required property 'id'");
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid data.job - should have required property 'name'");
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.data =  {"job": {
                            "name": "12"
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid data.job - should have required property 'id'");
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid data.client - should have required property 'name'");
    });

});

describe("Log data validation -", function () {
    var res, err;

    beforeEach(function (done) {
        testObj = JSON.parse(JSON.stringify(testObject));
        testObj.data =  {"client": {
                            "name": "hello"
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid data.client - should have required property 'id'");
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
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid category action - The action is not available for the provided category");
    });

});
