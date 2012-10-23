var buster = require('buster'),
    wp     = require(__dirname + '/..');

buster.testCase('command to open url', {
	'normally': function () {
		assert(
			new wp.Place('http://facebook.com/').commandToOpen()
			==
			'open "http://facebook.com/"'
		);
	},
	'with browser': function () {
		var browser = new wp.Browser('safari');
		browser.saveAs(['safari', 's']);

		assert(
			new wp.Place('http://fnobi.com/').commandToOpen(browser)
			==
			'open -a "safari" "http://fnobi.com/"'
		);
	},
	'with place': function () {
		var place = new wp.Place('http://facebook.com/');
		place.saveAs(['fb', 'facebook', 'facebook.com']);

		assert(
			wp.Place.find('fb').commandToOpen()
			==
			'open "http://facebook.com/"'
		);
	},
	'with place and browser': function () {
		var browser = new wp.Browser('safari');
		browser.saveAs(['safari', 's']);

		var place = new wp.Place('http://facebook.com/');
		place.setBrowser(wp.Browser.find('s'));
		place.saveAs(['fb', 'facebook', 'facebook.com']);

		assert(
			wp.Place.find('fb').commandToOpen()
			==
			'open -a "safari" "http://facebook.com/"'
		);
	}
});