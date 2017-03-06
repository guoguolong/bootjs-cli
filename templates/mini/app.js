'use strict';

const express = require('express');
const app = express();
const bootjs = require('bootjs');
const config = require('./config.js');

const bootjs = bootjs(app, config);

// 初始化bootjs
const isOk = bootjs.init();

if (!isOk) {
    console.error('[FATAL] bootjs initialization failed.');
    return 1;
} 

// 添加bootjs的路由规则.
bootjs.addRoutes(); 

let logo = '';
logo += '    __                __    _     ' + '\n';
logo += '   / /_  ____  ____  / /_  (______' + '\n';
logo += '  / __ \\/ __ \\/ __ \\/ __/ / / ___/' + '\n';
logo += ' / /_/ / /_/ / /_/ / /_  / (__  ) ' + '\n';
logo += '/_.___/\\____/\\____/\\____/ /____/  ' + '\n';
logo += '                     /___/        ' + '\n';

// global.bootjs = bootjs; 如有需要，可设置为全局变量.
app.listen(5000, () => {
    console.log(logo);
    console.log('A http server started at localhost:5000.');
});