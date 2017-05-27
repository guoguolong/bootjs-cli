'use strict';

const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
module.exports = function(config) {
    let filename = path.resolve(__dirname, '../../var/logs/access.log');
    let folder = path.parse(filename).dir;
    if (!fs.existsSync(folder)) {
        mkdirp(folder);
    }
    return {
        morgan: {
            format: ':x-forwarded-for - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":http_host" :response-time "-" "-" ":x-request-id" ":remote-addr"',
            rotator: {
                filename: filename,
                verbose: false
            }
        }
    }
}