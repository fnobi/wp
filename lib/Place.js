var util       = require('util'),
    exec       = require('child_process').exec,
    _          = require('underscore'),
    isHostname = require(__dirname + '/isHostname');

var Place = function (url, appName) {
	if (isHostname(url)) {
		url = 'http://' + url;
	}

	this.url = url || null;
	this.setBrowser(appName);
};
Place.bookmark = {};

Place.prototype.setBrowser = function (browser) {
	return this.appName = (browser || {}).appName || browser || null;
};

Place.prototype.commandToOpen = function (browser) {
	if (!this.url) {
		return null;
	}

	this.appName = this.appName || this.setBrowser(browser);

	if (this.appName) {
		return util.format(
			'open -a "%s" "%s"',
			this.appName, this.url
		);
	} else {
		return util.format('open "%s"', this.url);
	}
};

Place.prototype.open = function (browser, callback) {
	callback = callback || function () {};
	if (!this.url) {
		return callback(util.format('"%s" is invalid url', this.url));
	}

	var command = this.commandToOpen(browser);

	if (!command) {
		return callback('fail to generate command');
	}
	exec(command, callback);
};

Place.find = function (key) {
	var place = null;

	_.each(Place.bookmark, function (option, url) {
		if (_.include(option.keys, key)) {
			place = new Place(url);
			place.setBrowser(option.appName);
		}
	});

	return place;
};

Place.prototype.saveAs = function (keys) {
	Place.bookmark[this.url] = {
		keys: keys,
		appName: this.appName
	};
};

module.exports = Place;