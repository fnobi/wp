var fs = require('fs');

process.env.NODE_CONFIG_DIR = __dirname + '/config';

var wp = {
	Place   : require(__dirname + '/lib/Place'),
	Browser : require(__dirname + '/lib/Browser'),

	loadBookmark : function (bookmark) {
		bookmark = bookmark || {};

		this.Place.bookmark = bookmark.places || {};
		this.Browser.bookmark = bookmark.browsers || {};
	},

	saveBookmarkFile : function (filePath) {
		var bookmark = {
			places: this.Place.bookmark,
			browsers: this.Browser.bookmark
		};

		fs.writeFileSync(filePath, 'utf8', JSON.stringify(bookmark));
	},

	loadBookmarkFile : function (filePath) {
		var content = fs.readFileSync(filePath, 'utf8');
		return this.loadBookmark(JSON.parse(content) || {});
	}
};

module.exports = wp;