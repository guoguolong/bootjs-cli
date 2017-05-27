'use strict';

const bodyParser = require('body-parser');
module.exports = function(config) {
    return [
        bodyParser.json({
            limit: '50mb'
        }),
        bodyParser.urlencoded({
            limit: '50mb',
            extended: false
        })
    ];
}