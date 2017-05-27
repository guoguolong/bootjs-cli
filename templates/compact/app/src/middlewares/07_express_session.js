'use strict';

const session = require('express-session');
const ConnectRedis = require('connect-redis');
const IORedis = require('ioredis');
const IORedisTimeout = require('ioredis-timeout');

module.exports = function(config) {
    let options = {
        resave: false,
        saveUninitialized: true,
        secret: config.cookies.secretKey
    };
    const storeConf = config.session.store || {};
    if (storeConf.redis) {
        const RedisStore = ConnectRedis(session);
        const ioredis = new IORedis(storeConf.redis, {
            enableReadyCheck: false,
            retryStrategy: function(times) {
                return Math.min(50, 2000);
            }
        });
        if (storeConf.timeout && storeConf.timeout.ms) {
            IORedisTimeout(ioredis, storeConf.timeout.ms);
        }
        options.store = new RedisStore({
            client: ioredis,
            ttl: storeConf.redis.ttl
        });
    }
    return session(options);
}