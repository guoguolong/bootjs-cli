'use strict';

const CookieParser = require('cookie-parser');
module.exports = function(config) {
    return CookieParser(config.cookies.secretKey);
}