'use strict';
module.exports = {
    log4js: {
        appenders: [
            {
                type: 'file',
                filename: '/opt/kw/error.log',
                // filename: './var/logs/app.log',
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
