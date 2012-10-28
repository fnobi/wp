var util = require('util');

var Wp = function (defaultParam) {
	defaultParam = defaultParam || {};

	this.setURL(defaultParam.url || defaultParam);
	this.setApplication(defaultParam.application);
};

// URLを設定
Wp.prototype.setURL = function (url) {
	return this.url = url || null;
};

// 開くアプリケーションを指定
Wp.prototype.setApplication = function (application) {
	return this.application = application || null;
};

Wp.prototype.commandToOpen = function () {
	if (!this.url) {
		return false;
	}

	return util.format('open "%s"', this.url);
};


module.exports = Wp;