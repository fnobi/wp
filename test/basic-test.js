var buster = require('buster'),
    wp     = require(__dirname + '/..');

buster.testCase('basic', {
	'open url': function () {
		assert(
			wp.defaultBrowser.commandToOpen('http://facebook.com/')
			==
			'open "http://facebook.com/"'
		);
	},
	'with browser': function () {
		wp.defineBrowser('safari', ['s', 'safari']);

		var browser = wp.findBrowser('s');

		assert(
			browser.commandToOpen('http://fnobi.com/')
			==
			'open -a "safari" "http://fnobi.com/"'
		);
	},
	'with place': function () {
		wp.definePlace('http://facebook.com/', {
			keys : ['fb', 'facebook', 'facebook.com']
		});

		var place = wp.findPlace('fb');

		assert(
			wp.defaultBrowser.commandToOpen(place.url)
			==
			'open "http://facebook.com/"'
		);
	},
	'with place and browser': function () {
		wp.defineBrowser('safari', ['s', 'safari']);
		wp.definePlace('http://facebook.com/', {
			keys    : ['fb', 'facebook.com'],
			browser : 's'
		});

		var browser = wp.findBrowser('safari');
		var place = wp.findPlace('fb');

		assert(
			browser.commandToOpen(place)
			==
			'open -a "safari" "http://facebook.com/"'
		);
	}
});