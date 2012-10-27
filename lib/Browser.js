var util = require('util'),
    _    = require('underscore');

var Browser = function (name) {
	this.name = name || null;
	this.appName = name || null;
};
Browser.bookmark = {};

Browser.find = function (option) {
	var browser = null;

	_.each(Browser.bookmark, function (options, name) {
		if (_.include(options, option)) {
			browser = new Browser(name);
		}
	});

	return browser;
};

// このブラウザを、wpのコマンドラインオプションとして登録する
Browser.prototype.saveAsOption = function (options) {
	Browser.bookmark[this.name] = options;
};

module.exports = Browser;