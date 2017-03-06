'use strict';

class ProductController {
    constructor() {
        this.products =  '[MP5;TV,INTERNET]';
    }

    search(name) {
        this.res.send('Name: ' + name + ' | Category: ' + this.params.categoryId + ' | Style: ' + this.params.style);
    }

    list() {
        var html = '自动映射路由到这里: contorllers/ProductController.list()';
        html += '<br/>产品列表：' + this.products;
        this.res.send(html);
    }

    codeList() {
        var html = '代码文件指定路由到这里: contorllers/ProductController.codeList()';
        html += '<br/>产品列表：' + this.products
        this.res.send(html);
    }

    confList() {
        var html = '配置文件指定路由到这里: contorllers/ProductController.confList()';
        html += '<br/>产品列表：' + this.products + (this.ret++);;
        this.res.send(html);
    }

    edit(id, name) {
        this.res.htmlRender({
            id: id,
            name: name
        }, false);
    }

    view(id, name) {
        let common = require('bootjs-common');

        // 渲染方法1. 默认layout的数据 ,支持异步和同步
        let resp = new common.HtmlResponse({
            id: id,
            name: name
        });
        this.res.htmlRender(resp);
    }
}
module.exports = ProductController;