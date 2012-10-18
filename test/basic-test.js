var buster = require('buster'),
    wp     = require(__dirname + '/..');

buster.testCase('basic', {
	'select all': function () {
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
			'open -a safari "http://facebook.com/"'
		);
	}
});