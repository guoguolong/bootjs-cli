'use strict';
const os = require('os');
const express = require('express');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const bootjsCommon = require('bootjs-common');
const config = require('bootjs-config')(__dirname + '/app/config/');
const pkg = bootjsCommon.package(config.importPaths);
const bootjsRender = require('bootjs-render')(config.bootjs_render);
const log4js = require('log4js');
log4js.configure(config.log4js);

app.set('appName', config.appName);
app.set('views', config.srcBaseDir + 'views');
app.set('view engine', 'ejs');

config.loadPlugins(app);
app.getPlugin('bootjs').setAppContext({
    utils: bootjsCommon.utils,
    validator: pkg.import('kw.common.validator'),
    log4js: log4js,
    logger: log4js.getLogger('app')
});

// 2. 加载中间件.
// morgan实现 access_log
(function (app, cfg) {
    let moment = require('moment');
    let morgan = require('morgan');
    let FileStreamRotator = require('file-stream-rotator');
    morgan.format('datetime', function () {
        let text = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        text += ' [' + process.pid + '] INFO';
        return text;
    });
    morgan.token('beautful-ip', function (req) {
        return req.beautfulIp;
    })
    app.use(function (req, res, next) {
        req.beautfulIp = (req.headers['x-forwarded-for']
        || req.ip
        || req._remoteAddress
        || (req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress)))
        || req.headers['tn_realip'] || '').replace("::ffff:", "");
        next();
    });
    app.use(morgan(cfg.format, {stream: FileStreamRotator.getStream(cfg.rotator)}));
})(app, config.morgan);

// 跨域调试用调试.
app.use(function (req, res, next) {
    if (config.debugMode || req.query.debug == 1) {
        res.header("Access-Control-Allow-Origin", "*");
    }
    next();
});
app.use(require('express-partials')());

app.use(bootjsRender.htmlRender);
app.use(bootjsRender.apiRender);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator(pkg.import('kw.common.expressValidatorOptions')));
app.use(require('cookie-parser')());

let session = require('express-session');
let options = {
    resave: false,
    saveUninitialized: true,
    secret: 'lifeissimpebutyoumadeitcomplicated'
};

if (config.session.store && config.session.store.redis) {
    let RedisStore = require('connect-redis')(session);
    options.store = new RedisStore(config.session.store.redis);
}
app.use(session(options));

// app.use(csrf({ cookie: true })); @TODO: 不支持Swagger调试，暂时关闭.
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403);  // TODO: 给出一个友好的403页面
    res.send('403页面，非法FORM请求.');
})
app.use(express.static(config.appBaseDir + '../public'));
app.use(require('serve-favicon')(config.appBaseDir + '../public/images/favicon.ico'));
// flash信息的处理.
app.use(function (req, res, next) {
    res.locals.flash = null;
    if (req.session && req.session.flash) {
        res.locals.flash = req.session.flash;
        delete req.session.flash;
    }
    next();
});

app.getPlugin('bootjs').addRoutes(); // 添加bootjs的路由规则.

let logo = '';
logo += '    __                __    _     ' + '\n';
logo += '   / /_  ____  ____  / /_  (______' + '\n';
logo += '  / __ \\/ __ \\/ __ \\/ __/ / / ___/' + '\n';
logo += ' / /_/ / /_/ / /_/ / /_  / (__  ) ' + '\n';
logo += '/_.___/\\____/\\____/\\____/ /____/  ' + '\n';
logo += '                     /___/        ' + '\n';

app.listen(config.serverPort, () => {
    console.log(logo);
    console.log(config.appName + ' started at ' + os.hostname() + ':' + config.serverPort + '.');
});
