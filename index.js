var util = require('util');

var Wp = function (defaultParam) {
	defaultParam = defaultParam || {};

	this.setURL(defaultParam.url || defaultParam);
	this.setApplication(defaultParam.application);
};

Wp.bookmark = require(__dirname + '/lib/bookmark');

// URLを設定
Wp.prototype.setURL = function (url) {
	return this.url = url || null;
};

// 開くのに使うアプリケーションを指定
Wp.prototype.setApplication = function (application) {
	return this.application = application || null;
};

Wp.prototype.loadBookmark = function (key) {
	var param = Wp.bookmark.paramFor(key) || {};

	this.url = param.url || this.url;
	this.application = param.application || this.application;
};

// 開くためのコマンドを返す
Wp.prototype.commandToOpen = function () {
	if (!this.url && !this.application) {
		return false;
	}

	var terms = [];
	terms.push('open');

	if (this.application) {
		terms.push('-a');
		terms.push(util.format('"%s"', this.application));
	}

	if (this.url) {
		terms.push(util.format('"%s"', this.url));
	}


	return terms.join(' ');
};

module.exports = Wp;