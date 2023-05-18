'use strict';

var define = require('define-properties');

var getPolyfill = require('./polyfill');
var getMap = require('es-map/polyfill');

module.exports = function shim() {
	var polyfill = getPolyfill();

	var $Map = getMap();
	define(
		$Map,
		{ groupBy: polyfill },
		{ groupBy: function () { return $Map.groupBy !== polyfill; } }
	);
	if (typeof Map === 'function' && Map !== $Map) {
		define(
			Map,
			{ groupBy: polyfill },
			{ groupBy: function () { return Map.groupBy !== polyfill; } }
		);
	}

	return polyfill;
};
