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
            format: ':datetime :beautful-ip :method :url :status responseTimeFN=:response-time ms',
            rotator: {
                filename: filename,
                verbose: false
            }
        }
    }
}