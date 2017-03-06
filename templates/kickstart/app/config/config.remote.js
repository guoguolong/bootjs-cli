'use strict';
module.exports = {
    remote: {
        cache: {
            storageType: 'redis',
            storage: {
                redis: {
                    host: 'localhost',
                    port: 6379,
                }
            },
            shortTermCache: {
                expired: 100 * 60 * 1000,// 单位：ms.  此例为100分钟。
                enabled: true
            },
            longTermCache: {
                expired: 24 * 60 * 60 * 1000, // 单位：ms, 0表示永久保存. 此例为1天。
                enabled: false
            },
            keyPrefix: 'LIGHTMVC:REMOTE_SERVICES:CACHE:'
        },
        httpTimeout: 20 * 1000,
        services: {
        }
    }
};
