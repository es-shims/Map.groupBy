'use strict';

require('es-map/auto');
require('../auto');

var test = require('tape');
var defineProperties = require('define-properties');
var callBind = require('call-bind');
var functionsHaveNames = require('functions-have-names')();

var isEnumerable = Object.prototype.propertyIsEnumerable;

var runTests = require('./tests');

var name = 'groupBy';
var fullName = 'Map.' + name;

test('shimmed', function (t) {
	var fn = Map[name];

	t.equal(fn.length, 2, fullName + ' has a length of 2');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(fn.name, name, fullName + ' has name "' + name + '"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Map, name), fullName + ' is not enumerable');
		et.end();
	});

	runTests(callBind(fn, Map), t);

	t.end();
});
