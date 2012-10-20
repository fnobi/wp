var Place   = require(__dirname + '/lib/Place');
var Browser = require(__dirname + '/lib/Browser');

var wp = {};
var browsers = {};
var places = {};

wp.definePlace = function (url, options) {
	var place = new Place(url);
	(options.keys || options).forEach(function (key) {
		places[key] = place;
	});
};

wp.findPlace = function (name) {
	return places[name] || null;
};

wp.defineBrowser = function (name, options) {
	var browser = new Browser(name);

	(options.keys || options).forEach(function (key) {
		browsers[key] = browser;
	});
};

wp.findBrowser = function (name) {
	return browsers[name] || null;
};

wp.defaultBrowser = new Browser();

module.exports = wp;