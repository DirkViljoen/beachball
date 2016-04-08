var db = require('../libs/dbWarehouse');

describe("Log schema validation -", function () {

    beforeEach(function (done) {
        this.spy_getDB = spyOn(db, 'getDB').and.returnValue({getCollection: {}});
        this.spy_getColl = spyOn(db, 'getCollection').and.returnValue({});

        var log = require('../models/log');

        log({})
            .then(function (result) {
                done();
            }, function (error) {
                done();
            });
    });

    it("Should be able to accept a valid json object", function () {
        expect(this.spy_getDB).toHaveBeenCalled();
        expect(this.spy_getColl).toHaveBeenCalled();
    });
});
