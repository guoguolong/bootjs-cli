'use strict';

const config = require('bootjs-config')(__dirname + '/app/config/');
const os = require('os');
const express = require('express');
const app = express();
const bootjsCommon = require('bootjs-common');
const pkg = bootjsCommon.package(config.importPaths);
const log4js = require('log4js');

module.exports = {
    getAppConfig(){
        return config;
    },

    createApplication() {
        log4js.configure(config.log4js);

        app.enable('trust proxy');
        app.set('appName', config.appName);

        global.__config__ = config;
        Object.assign(app.locals, {__config__: config});
        config.loadPlugins(app, {
            contexts: {
                utils: bootjsCommon.utils,
                validator: pkg.import('kw.common.validator'),
                log4js: log4js,
                logger: log4js.getLogger('app')
            }
        });

        app.getPlugin('bootjs').loadMiddlewares(config); // 加载中间件.
        app.getPlugin('bootjs').addRoutes(); // 添加bootjs的路由规则.

        return app;
    }
};