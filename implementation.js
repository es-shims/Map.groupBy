'use strict';

var callBind = require('call-bind');
var forEach = require('es-abstract/helpers/forEach');

var $Map = require('es-map/polyfill')();

var $mapSet = callBind($Map.prototype.set);

var GroupBy = require('./aos/GroupBy'); // TODO: replace with es-abstract 2024 implementation

module.exports = function groupBy(items, callbackfn) {
	var groups = GroupBy(items, callbackfn, 'ZERO'); // step 1

	var map = new $Map(); // step 2

	forEach(groups, function (g) { // step 3
		$mapSet(map, g['[[Key]]'], g['[[Elements]]']); // steps 3.a - 3.c
	});

	return map; // step 4
};
