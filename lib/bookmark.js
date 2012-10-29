var _ = require('underscore');

var bookmark = {};

bookmark.clear = function () {
	bookmark.list = {};
};

bookmark.add = function (key, param) {
	if (!_.isObject(key)) {
		return bookmark.list[key] = param;
	}

	var self = this;
	var params = key;

	_.each(params, function (param, key) {
		self.list[key] = param;
	});
};

bookmark.paramFor = function (key) {
	return bookmark.list[key] || null;
};



bookmark.clear();

module.exports = bookmark;
