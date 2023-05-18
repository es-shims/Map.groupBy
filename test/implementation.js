'use strict';

var callBind = require('call-bind');
var test = require('tape');

var implementation = require('../implementation');
var runTests = require('./tests');

test('as a function', function (t) {
	runTests(callBind(implementation, typeof Map === 'function' ? Map : null), t);

	t.end();
});
