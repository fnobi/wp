var buster = require('buster'),
    wp     = require(__dirname + '/..');

buster.testCase('command to open url', {
	'normally': function () {
		assert(
			wp.Browser.defaultBrowser.commandToOpen('http://facebook.com/')
			==
			'open "http://facebook.com/"'
		);
	},
	'with browser': function () {
		wp.Browser.define('safari', ['s', 'safari']);

		var browser = wp.Browser.find('s');

		assert(
			browser.commandToOpen('http://fnobi.com/')
			==
			'open -a "safari" "http://fnobi.com/"'
		);
	},
	'with place': function () {
		wp.Place.define('http://facebook.com/', {
			keys : ['fb', 'facebook', 'facebook.com']
		});

		var place = wp.Place.find('fb');

		assert(
			wp.Browser.defaultBrowser.commandToOpen(place.url)
			==
			'open "http://facebook.com/"'
		);
	},
	'with place and browser': function () {
		wp.Browser.define('safari', ['s', 'safari']);
		wp.Place.define('http://facebook.com/', {
			keys    : ['fb', 'facebook.com'],
			browser : 's'
		});

		var browser = wp.Browser.find('safari');
		var place = wp.Place.find('fb');

		assert(
			browser.commandToOpen(place)
			==
			'open -a "safari" "http://facebook.com/"'
		);
	}
});