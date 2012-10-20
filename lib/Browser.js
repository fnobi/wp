var util          = require('util'),
    child_process = require('child_process'),
    _             = require('underscore'),
    browsers      = require('config').browsers;

var Browser = function (name) {
	this.name = name || null;
};

Browser.define = function (name, options) {
	browsers[name] = options;
};

Browser.find = function (key) {
	for (var name in browsers) {
		if (_.include(browsers[name], key)) {
			return new Browser(name);
		};
	}
	return new Browser();
};

Browser.defaultBrowser = new Browser();

Browser.prototype.commandToOpen = function (url) {
	if (!url) {
		return null;
	}

	url = url.url || url;

	if (this.name) {
		return util.format('open -a "%s" "%s"', this.name, url);
	} else {
		return util.format('open "%s"', url);
	}
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