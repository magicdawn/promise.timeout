'use strict';

const ptimeout = require('../');
const should = require('should');

describe('simple use', function() {
  it('it works', function*() {

    // a function will cost 20ms
    function test() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(20);
        }, 20);
      });
    }

    const test10 = ptimeout(test, 10);
    const test50 = ptimeout(test, 50);

    // 10 timeout
    try {
      yield test10();
    } catch (e) {
      e.should.be.ok();
      e.should.be.instanceof(ptimeout.TimeoutError);
      e.message.should.match(/timeout/);
      e.timeout.should.equal(10);
    }

    // 50 ok
    const _50 = yield test50();
    _50.should.be.ok();
    _50.should.equal(20);
  });
});