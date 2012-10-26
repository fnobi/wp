var util = require('util'),
    exec = require('child_process').exec,
    _    = require('underscore');

var Place = function (url, browserName) {
	if (Place.isHostname(url)) {
		url = 'http://' + url;
	}

	this.url = url || null;
	this.setBrowser(browserName);
};
Place.bookmark = {};

Place.prototype.setBrowser = function (browser) {
	return this.browserName = (browser || {}).name || browser || null;
};

Place.prototype.commandToOpen = function (browser) {
	if (!this.url) {
		return null;
	}

	this.browserName = this.browserName || this.setBrowser(browser);

	if (this.browserName) {
		return util.format(
			'open -a "%s" "%s"',
			this.browserName, this.url
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
			place.setBrowser(option.browserName);
		}
	});

	return place;
};

Place.prototype.saveAs = function (keys) {
	Place.bookmark[this.url] = {
		keys: keys,
		browserName: this.browserName
	};
};

Place.isHostname = function (value) {
	return value.match(/^[^\/]+\.(com|jp|it|net|org|tv|uk|info|biz)/);
};


module.exports = Place;