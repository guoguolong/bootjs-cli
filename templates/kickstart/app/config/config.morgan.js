'use strict';
module.exports = {
    morgan: {
        format: ':datetime :beautful-ip :method :url :status responseTimeFN=:response-time ms',
        rotator: {
            date_format: 'YYYYMMDD',
            filename: "./var/logs/access-%DATE%.log",
            frequency: 'daily',
            verbose: false
        }
    }
};