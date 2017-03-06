/**
 * 示例如何渲染网页(HtmlResponse风格.)
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

const common = require('bootjs-common');
class HtmlRespClassController {
    noLayoutNoData() {
        let resp = new common.HtmlResponse();

        resp.layout = false;

        this.res.htmlRender(resp);
    }

    noLayoutWithData() {
        let resp = new common.HtmlResponse();

        resp.data = {content: '没有布局、传递数据、默认模板文件'};
        resp.layout = false;

        this.res.htmlRender(resp);
    }

    layoutDefault() {
        let resp = new common.HtmlResponse();

        resp.data = {content: '默认布局、传递数据、默认模板文件'};

        this.res.htmlRender(resp);
    }

    changeLayout() {
        let resp = new common.HtmlResponse();

        resp.data = {
            content: '定制布局、传递数据、默认模板文件'
        };
        resp.layout = 'kickstart/layout/base';
        // 或者 
        // resp.layout = {layout: 'kickstart/layout/base'};
        this.res.htmlRender(resp);
    }

    changeViewPath() {
        let resp = new common.HtmlResponse();

        resp.data = {
            content: '默认布局、传递数据、定制模板文件',
        };
        resp.viewPath = 'kickstart/HtmlRespClass/another';
        this.res.htmlRender(resp);
    }
}

module.exports = HtmlRespClassController;