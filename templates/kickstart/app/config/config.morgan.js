'use strict';

const path = require('path');
module.exports = {
    morgan: {
        format: ':datetime :beautful-ip :method :url :status responseTimeFN=:response-time ms',
        rotator: {
            date_format: 'YYYYMMDD',
            filename: path.resolve(__dirname, '../../var/logs/access-%DATE%.log'),
            frequency: 'daily',
            verbose: false
        }
    }
};