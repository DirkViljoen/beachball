var calculator = require('../models/calculator');
var advanced = require('../models/calculator-advanced');
var extended = require('../models/calculator-extended');

describe("Calculator -", function() {
    // Clean basic unit testing. Calling methods as they are and not spying

    beforeEach(function() {

    });

    it("should be able to add 1 and 2", function() {
        expect(calculator.add(1,2)).toEqual(3);
    });

    it("should be able to subtract 2 from 1", function() {
        expect(calculator.subtract(1,2)).toEqual(-1);
    });

    it("should be able to multiply 1 and 2", function() {
        expect(calculator.multiply(1,2)).toEqual(2);
    });

    it("should be able to divide 1 by 2", function() {
        expect(calculator.divide(1,2)).toEqual(0.5);
    });

    it("should be able to divide 5 by 2 and round", function() {
        expect(calculator.divideInt(5,2)).toEqual(3);
    });

    it("should be able to add pi to 2", function() {
        expect(calculator.addPi(2)).toEqual(5.147);
    });

});

// Spies
describe("Calculator with Spy -", function() {
    // Carefull, spying on functions called directly causes variables to be undefined and not to keep their values as may be expected.

    var a1 = null;

    beforeEach(function() {
        this.spy_round = spyOn(advanced, 'round');

        a1 = 0;
        a1 = calculator.divideInt(5,2);
        a1 = calculator.divideInt(9,2);
    });

    it('track that function have been called', function () {
        expect(this.spy_round).toHaveBeenCalled();
    });

    it('track argument calls', function () {
        expect(this.spy_round).toHaveBeenCalledWith(2.5);
        expect(this.spy_round).toHaveBeenCalledWith(4.5);
    });

    it('stop function execution', function () {
        expect(a1).toBeUndefined();
    });

});

describe("Calculator with Spy Return value -", function() {

    beforeEach(function() {
        this.spy_round = spyOn(advanced, 'round').and.returnValue('test');
    });

    it('should be possible to override a require', function () {
        expect(calculator.divideInt(5,2)).toEqual('test');
        expect(this.spy_round).toHaveBeenCalled();
        expect(this.spy_round).toHaveBeenCalledWith(2.5);
    });

});

describe("Calculator with Spy CallThrough -", function() {
    var a1 = null;

    beforeEach(function() {
        this.spy_round = spyOn(advanced, 'round').and.callThrough();

        a1 = 0;
        a1 = calculator.divideInt(5,2);
    });

    it('track that a function have been called', function () {
        expect(this.spy_round).toHaveBeenCalled();
    });

    it('track argument calls', function () {
        expect(this.spy_round).toHaveBeenCalledWith(2.5);
    });

    it('does not effect function execution', function () {
        expect(a1).toEqual(3);
    });

});

// Object Spies
describe("Calculator with Object Spy -", function() {
    var ext;

    beforeEach(function() {
        // ext = new extended();
        // this.spy_pi = spyOn(extended, 'pi');
        ext = jasmine.createSpyObj('extended', ['pi']);
        var a1 = calculator.addPi(2);

    });

    it("calls the pi() function", function () {
        expect(ext.pi).toBeDefined();
        expect(ext.pi).toHaveBeenCalled();
    });

});
