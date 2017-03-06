'use strict';
module.exports = function(bootjs) {

    // 静态路由方法1: 手动增加路由
    let targetUrl = 'kickstart/product/codeList';
    if (bootjs.config.router.autoUrlPrefix) {
        targetUrl = 'kickstart_product/codeList';
    }
    bootjs.addRoute({
        target: targetUrl, 
        source: '/kickstart/product/list/?:name?', 
        method: 'get'
    });

    // // 静态路由方法2: 最原始方法路由
    // bootjs.app.get('/product/list/?:name?' , function(req, res, next){
    //     res.end('Express route here.');
    // });
};
