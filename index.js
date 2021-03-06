var util       = require('util'),
    isHostName = require(__dirname + '/lib/isHostName'),
    exec       = require('child_process').exec;

var Wp = function (defaultParam) {
	defaultParam = defaultParam || {};

	this.url = defaultParam.url || defaultParam || null;
	this.application = defaultParam.application || null;
};

Wp.bookmark = require(__dirname + '/lib/bookmark');

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

	var url; var terms;

	url = this.url;
	// urlが数字のみで構成されていたら、localhostのport番号と解釈
	if (url.match(/^[0-9]+$/)) {
		url = 'localhost:' + url;
	}
	// urlがhost名だったら、http://を付ける
	if (isHostName(url)) {
		url = 'http://' + url;
	}

	terms = [];
	terms.push('open');

	if (this.application) {
		terms.push('-a');
		terms.push(util.format('"%s"', this.application));
	}

	if (url) {
		terms.push(util.format('"%s"', url));
	}


	return terms.join(' ');
};

Wp.prototype.open = function (callback) {
	exec(this.commandToOpen(), function (err, res) {
		if (err) {
			console.error(err);
		}
	});
};

module.exports = Wp;