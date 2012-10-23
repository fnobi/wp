var util = require('util');

var places = {};

var Place = function (url, browserName) {
	this.url = url || null;
	this.setBrowser(browserName);
};

Place.prototype.setBrowser = function (browser) {
	return this.browserName = (browser || {}).name || browser || null;
};

Place.prototype.saveAs = function (keys) {
	var self = this;
	keys.forEach(function (key) {
		places[key] = {
			url: self.url,
			browserName: self.browserName
		};
	});
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

Place.find = function (key) {
	return places[key] ?
		new Place(places[key].url, places[key].browserName) :
		null;
};


module.exports = Place;