var util          = require('util'),
    child_process = require('child_process');

var Browser = function (name) {
	this.name = name || null;
};
Browser.prototype.commandToOpen = function (url) {
	if (!url) {
		return false;
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
	var command = this.commandToOpen(url);

	if (!command) {
		return callback('fail to generate command');
	}
	child_process.exec(command, callback);
};

module.exports = Browser;