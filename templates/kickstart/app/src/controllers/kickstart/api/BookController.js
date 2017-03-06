/**
 * 图书相关的Web Api操作
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

const _ = require('lodash');
const common = require('bootjs-common');
const AppError = importModel('kw.common.AppError');
class BookController {
    remove(id) {
        let apiResp = new common.ApiResponse();
        let bookSrv = this.ctx.getService('kw.kickstart.BookService');

        let result = bookSrv.remove(id);
        if (result) {
            apiResp.setMessage('图书删除成功');
        } else {
            apiResp.setCode(AppError.codes['ROW_DELETED_FAILED'], '图书删除失败,可能指定的图书不存在')
        }

        this.res.apiRender(apiResp);
    }

    save(id) {
        let apiResp = new common.ApiResponse();
        let bookSrv = this.ctx.getService('kw.kickstart.BookService');

        // TODO: 表单校验、过滤
        let name = _.trim(this.req.body.name);
        let price = this.req.body.price;
        let errMsgs = [];
        if (isNaN(price)) {
            errMsgs.push('价格必须为数字');
        }
        if (!name) {
            errMsgs.push('图书名不能为空');
        }

        if (errMsgs.length > 0) {
            this.res.locals.validation = {
                type: 'error',
                messages: errMsgs,
            };
            this.res.locals.title = '新增图书';
            if (id) {
                this.res.locals.title = '编辑图书';
            }

            let book = {
                id: id,
                name: name,
                price: price,
            };
            this.res.htmlRender({book: book}, false, 'kickstart/book/edit');

            // // TODO: 这里redirect模式不推荐.
            // if (!id) id = '';
            // this.res.redirect('/book/edit/' + id);
        } else {
            let book = bookSrv.save(id, name, price);
            if (book) {
                this.req.session.flash = {
                    type: 'success',
                    messages: ['成功存储了图书信息'],
                };
            }
            this.res.redirect('/kickstart/book/search');
        }
    }        
}

module.exports = BookController;