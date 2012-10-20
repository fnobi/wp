process.env.NODE_CONFIG_DIR = __dirname + '/config';

var wp = {
	Place   : require(__dirname + '/lib/Place'),
	Browser : require(__dirname + '/lib/Browser')
};

module.exports = wp;