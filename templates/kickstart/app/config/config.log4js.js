'use strict';

const path = require('path');
module.exports = {
    log4js: {
        appenders: [
            {
                type: 'file',
                filename: path.resolve(__dirname, '../../var/logs/app.log');
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
};
