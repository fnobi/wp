var util          = require('util'),
    child_process = require('child_process'),
    _             = require('underscore'),
    browsers      = require('config').browsers;

var Browser = function (name) {
	this.name = name || null;
};

Browser.find = function (key) {
	return browsers[key] ? new Browser(browsers[key]) : null;
};

Browser.prototype.saveAs = function (keys) {
	var self = this;
	keys.forEach(function (key) {
		browsers[key] = self.name;
	});
};

Browser.prototype.open = function (url, callback) {
	callback = callback || function () {};
	if (!url) {
		return callback(util.format('"%s" is invalid url', url));
	}

	var command = this.commandToOpen(url);

	if (!command) {
		return callback('fail to generate command');
	}
	child_process.exec(command, callback);
};

module.exports = Browser;