'use strict';

const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
module.exports = function(config) {
    let filename = path.resolve(__dirname, '../../var/logs/app.log');
    let folder = path.parse(filename).dir;
    if (!fs.existsSync(folder)) {
        mkdirp(folder);
    }
    return {
        log4js: {
            appenders: [
                {
                    type: 'file',
                    filename: filename,
                    maxLogSize: 20480,
                    backups: 3,
                    category: 'app',
                    layout: {
                        'type': 'pattern',
                        'pattern': '%d %p %c - %m'
                    }
                }
            ],
            levels: {
                app: 'WARN'
            }
        }
    }
}