'use strict';

const favicon = require('serve-favicon');

module.exports = function(config) {
    return favicon(config.appBaseDir + '../public/favicon.ico');
}