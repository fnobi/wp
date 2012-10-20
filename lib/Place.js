var util = require('util');

var places = {};

var Place = function (url) {
	this.url = url || null;
};

Place.define = function (url, options) {
	var place = new Place(url);
	(options.keys || options).forEach(function (key) {
		places[key] = place;
	});
};

Place.find = function (name) {
	return places[name] || null;
};


module.exports = Place;