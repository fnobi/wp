(function (module) {
                var patterns = {
                hostname  : /^[^\/]+\.(com|jp|it|net|org|tv|uk|info|biz|o)/,
                localhost : /^localhost(:[0-9]+)?$/,
                IPAddress : /^[1-9][0-9]{0,2}\.[1-9][0-9]{0,2}\.[1-9][0-9]{0,2}\.[1-9][0-9]{0,2}$/
        };

        var isHostname = function (value) {
                var result = false;
                for (var key in patterns) {
                        result = result || value.match(patterns[key]);
                }

                return result;
        };

        module.exports = isHostname;
})(module);

