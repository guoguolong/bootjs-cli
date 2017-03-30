'use strict';
const os = require('os');
const bootstrap = require('./_app.js');
const config = bootstrap.getAppConfig();
const app = bootstrap.createApplication();
config.easyMonitor && config.easyMonitor.needStart && require('easy-monitor')(config.easyMonitor);

// 启动服务器
let logo = '\n';
logo += '    __                __    _     ' + '\n';
logo += '   / /_  ____  ____  / /_  (______' + '\n';
logo += '  / __ \\/ __ \\/ __ \\/ __/ / / ___/' + '\n';
logo += ' / /_/ / /_/ / /_/ / /_  / (__  ) ' + '\n';
logo += '/_.___/\\____/\\____/\\____/ /____/  ' + '\n';
logo += '                     /___/        ' + '\n';

app.listen(config.serverPort, () => {
    console.log(logo);
    console.log('[' + new Date() + ']', '[app.js]: ', config.appName + ' started at ' + os.hostname() + ':' + config.serverPort + '.');
});