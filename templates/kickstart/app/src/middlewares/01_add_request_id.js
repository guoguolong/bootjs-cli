'use strict';

const addRequestId = require('express-request-id')();
module.exports = function(config) {
    return addRequestId;
}