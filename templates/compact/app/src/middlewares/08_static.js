'use strict';

const express = require('express');

module.exports = function(config) {
    return express.static(config.appBaseDir + '../public');
}

