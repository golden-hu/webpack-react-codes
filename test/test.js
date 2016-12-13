var chai = require('chai');
var expect = chai.expect;

describe('some simple tests', function() {
	it('test equal', function() {
		expect( 4 + 5).to.equal(9);
	})
	it('test no equal', function() {
		expect(4+5).to.not.equal(10);
	})
	it('test to be true', function() {
		expect(true).to.be.true;
	})
	it('test object equal', function() {
		expect({'name': 'viking'}).to.not.equal({'name':'viking'});
		expect({'name': 'viking'}).to.deep.equal({'name':'viking'});
	})

})
