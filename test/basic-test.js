var util   = require('util'),
    buster = require('buster'),
    Wp     = require(__dirname + '/..');

buster.testCase('wp', {
	'return command to open url': function () {
		var url = 'http://facebook.com/';

		assert.equals(
			new Wp(url).commandToOpen(),
			util.format('open "%s"', url)
		);
	},

	'set url by two ways': function () {
		var url = 'http://facebook.com/';

		var wp1 = new Wp(url);
		var wp2 = new Wp();
		wp2.setURL(url);

		assert.equals(
			wp1.commandToOpen(),
			wp2.commandToOpen()
		);
	},

	'with browser': function () {
		var url = 'http://fnobi.com';
		var application = 'safari';
		var option = 's';

		Wp.bookmarks = {};
		Wp.bookmarks[option] = {
			application: application
		};

		var wp = Wp.bookmark.load(option);
		wp.setURL(url);

		assert.equals(
			wp.commandToOpen(),
			util.format('open -a "%s" "%s"', application, url)
		);
	},

	'with place': function () {
		var url = 'http://facebook.com/';
		var key = 'fb';

		Wp.bookmarks = {};
		Wp.bookmarks[key] = {
			url: url
		};

		assert.equals(
			Wp.bookmark.load(key).commandToOpen(),
			util.format('open "%s"', url)
		);
	},

	'with place and browser': function () {
		Wp.bookmark = {
			's': {
				application: 'safari'
			},
			'fb': {
				url: 'http://facebook.com'
			}
		};

		var wp = Wp.bookmark.load('s');
		wp.loadBookmark('fb');

		assert.equals(
			wp.commandToOpen(),
			'open -a "safari" "http://facebook.com/"'
		);
	}
});