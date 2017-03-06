/**
 * 示例如何渲染网页
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

class HtmlRespFlatController {
    noLayoutNoData() {
        this.res.htmlRender(null, false);
    }

    noLayoutWithData() {
        this.res.htmlRender({content: '没有布局、传递数据、默认模板文件'}, false);
    }

    layoutNoArgs() {
        this.res.htmlRender();
    }

    layoutDefault() {
        this.res.htmlRender({
            content: '默认布局、传递数据、默认模板文件'
        });
    }

    changeLayout() {
        this.res.htmlRender({
            content: '定制布局、传递数据、默认模板文件'
        }, {layout: 'kickstart/layout/base'});
    }

    changeViewPath() {
        this.res.htmlRender({
            content: '默认布局、传递数据、定制模板文件',
        }, true, 'kickstart/htmlRespFlat/another');
    }

    renderStyle() {
        this.res.htmlRender("kickstart/htmlRespFlat/renderStyle", {content: '默认render参数风格的渲染.'});
    }
    
}

module.exports = HtmlRespFlatController;