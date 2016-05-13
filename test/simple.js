'use strict';

const ptimeout = require('../');
const should = require('should');

describe('simple use', function() {
  it('it works', function*() {

    function test() {
      return new Promise(function(resolve, reject) {
        setTimeout(resolve, 20);
      });
    }

    const t10 = ptimeout(test, 10);
    const t50 = ptimeout(test, 50);

    try {
      yield t10();
    } catch (e) {
      e.should.be.ok();
      e.should.be.instanceof(ptimeout.TimeoutError);
    }
  });
});