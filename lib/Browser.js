var util = require('util'),
    _    = require('underscore');

var Browser = function (name) {
	this.name = name || null;
};
Browser.bookmark = {};

Browser.find = function (key) {
	var browser = null;

	_.each(Browser.bookmark, function (keys, name) {
		if (_.include(keys, key)) {
			browser = new Browser(name);
		}
	});

	return browser;
};

Browser.prototype.saveAs = function (keys) {
	Browser.bookmark[this.name] = keys;
};

module.exports = Browser;