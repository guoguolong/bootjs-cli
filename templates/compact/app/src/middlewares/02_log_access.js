'use strict';

const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');
module.exports = function(config) {
    let cfg = config.morgan;
    morgan.token('x-request-id', function (req) {
        return req.id;
    });
    morgan.token('x-forwarded-for', function (req) {
        return req.headers['x-forwarded-for'];
    });
    morgan.token('http_host', function (req) {
        return req.hostname;
    });

    return morgan(cfg.format, {stream: FileStreamRotator.getStream(cfg.rotator)});
}