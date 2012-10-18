var buster = require('buster'),
    wp     = require(__dirname + '/..');

buster.testCase('basic', {
	'open url': function () {
		assert(
			wp.compile('http://fnobi.com/')
			==
			'open "http://facebook.com/"'
		);
	},
	'with browser': function () {
		wp.defineBrowser('safari', ['s', 'safari']);
		assert(
			wp.compile('http://fnobi.com/', ['s'])
			==
			'open -a "safari" "http://facebook.com/"'
		);
	},
	'with place': function () {
		wp.definePlace('http://facebook.com/', {
			key     : ['fb', 'facebook.com']
		});

		wp.compile('fb');

		assert((
			wp.compile('fb')
			==
			'open "http://facebook.com/"'
		) && (
			wp.compile('fb')
			==
			'open "http://facebook.com/"'
		));
	},
	'with place and browser': function () {
		// wp.defineEnv('mac');
		wp.defineBrowser('safari', ['s', 'safari']);
		wp.definePlace('http://facebook.com/', {
			key     : ['fb', 'facebook.com'],
			browser : 's'
		});

		// wp.save();
		// wp.open('fb');
		wp.compile('fb');

		assert(
			wp.compile('fb')
			==
			'open -a "safari" "http://facebook.com/"'
		);
	}
});