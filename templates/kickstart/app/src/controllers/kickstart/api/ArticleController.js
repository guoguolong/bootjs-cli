/**
 * 货品相关Web Api操作
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

const articles = [
    {id: 1, name: '小米电视'},
    {id: 2, name: '东亭沙发'},
    {id: 100, name: "Nodejs指南"},
    {id: 101, name: "小米电风扇"},
    {id: 102, name: "现代PHP开发"}
];
const common = require('bootjs-common');
const AppError = importModel('kw.common.AppError');

class ArticleController {
    list() {
        let ApiResponse = common.ApiResponse;
        let someArticles = articles;
        if (this.req.query.keyword) {
            someArticles = articles.filter(item=>{
                let reg = new RegExp('(' + this.req.query.keyword + ')');
                if (item.name.match(reg)) {
                    return item;
                }
                return false;
            });
        }
        let apiResp = new ApiResponse(someArticles);
        // apiResp.setCode(AppError.codes['USER_NOT_LOGIN']); //设置错误码

        // // 渲染方法1:直接输出数据（到浏览器），支持同步或异步，推荐使用，
        this.res.apiRender(apiResp);
        // this.res.apiRender(apiResp.data , AppError.codes['USER_NOT_LOGIN']); // 设置错误码
        // this.res.apiRender(apiResp.data , AppError.codes['USER_NOT_LOGIN'], '定制错误信息'); // 设置定制错误

        // 渲染方法3: 直接返回数据，仅支持同步，不推荐使用..
        // return apiResp;
    }

    getList() {
        return this.list();
    }

    detail(id) {
        let someArticles = articles.filter(item=>{ return (id == item.id) ? item : false; });
        let apiResp = new common.ApiResponse();
        if (someArticles.length === 0) {
            apiResp.setCode(AppError.codes['ROW_NOT_FOUND']); //设置错误码
        } else {
            apiResp.data = someArticles[0];
        }

        this.res.apiRender(apiResp);
    }

    update(id) {
        let ApiResponse = require('bootjs-common').ApiResponse;

        let article = null;
        articles.map(item=>{
            if (id == item.id) {
                item.name = this.req.body.name;
                article = item;
            }
        });
        let apiResp = new ApiResponse(article);
        if (!article) {
            apiResp.setCode(AppError.codes['ROW_NOT_FOUND']); //设置错误码
        }
        this.res.apiRender(apiResp);
    }

    bad() {
        this.req.requestType = 'ajax';
        throw new Error('Ajax exception occurred.')
        let apiResp = new common.ApiResponse();
        if (articles.length === 0) {
            apiResp.setCode(AppError.codes['ROW_NOT_FOUND']); //设置错误码
        } else {
            apiResp.data = articles[0];
        }

        this.res.apiRender(apiResp);
    }
}

module.exports = ArticleController;