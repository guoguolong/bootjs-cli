/**
 * 图书相关的所有操作
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

class BookController {
    __construct() {
        this.bookSrv = this.ctx.getService('kw.kickstart.BookService');
    }

    search() {
        let booksWithPage = this.bookSrv.search(this.req.query.keyword);
        this.res.htmlRender(booksWithPage, false);
    }

    add() {
        this.res.locals.title = '新增图书';
        this.res.htmlRender({
            book: {},
            csrfToken: (typeof this.req.csrfToken === 'function')? this.req.csrfToken(): null
        }, false, 'kickstart/book/edit');
    }

    edit(id) {
        if (!id) {
            this.res.redirect('/kickstart/book/add');
            return;
        }

        this.res.locals.title = '编辑图书';
        let book = this.bookSrv.get(id);
        this.res.htmlRender({
            book: book,
            csrfToken: (typeof this.req.csrfToken === 'function')? this.req.csrfToken(): null
        }, false);
    }

    save(id) {
        let common = require('bootjs-common');
        let validator = require('validator');
        let utils = common.utils;

        // 直接使用validator校验错误.
        if (id && !validator.isInt(id)) { // 
            return this.res.end('ID不是数字，极有可能是非法入侵');
        }
        // 暂存原始body
        let post = Object.assign({}, this.req.body);

        // 表单数据过滤
        if (this.req.body.isPromotion == undefined) this.req.body.isPromotion = false;
        this.req.sanitizeBody('isPromotion').toBoolean();
        this.req.sanitizeBody('price').toFloat();
        this.req.sanitizeBody('email').normalizeEmail();
        this.req.sanitizeBody('name').trim();

        // 表单数据校验
        this.req.checkBody('isPromotion', '促销选项必须true/false').isBoolean();
        this.req.checkBody('price', '价格必须是数字并且大于0').isNumeric();
        this.req.checkBody('email', 'EMAIL格式看起来不合法').isEmail();
        this.req.checkBody('name', '名字至少要5个字符').isLength(5); // tirm()

        let book = post;
        book.id = id;
        let errors = this.req.validationErrors();
        if(errors) {
            this.res.locals.validation = utils.formatWebErrors(errors);

            this.res.locals.title = '新增图书';
            if (id) {
                this.res.locals.title = '编辑图书';
            }
            this.res.htmlRender({
                book: book,
                csrfToken: (typeof this.req.csrfToken === 'function')? this.req.csrfToken(): null
            }, false, 'kickstart/book/edit');

            // // 方法2: 这里redirect模式不推荐.
            // if (!id) id = '';
            // this.res.redirect('/book/edit/' + id);
        } else {
            book = this.bookSrv.save(book);
            if (book) {
                this.req.session.flash = {
                    type: 'success',
                    messages: ['成功存储了图书信息'],
                };
            }
            this.res.redirect('/kickstart/book/search');
        }
    }

    view(id) {
        let filtered = [];
        books.forEach(function(item) {
            let reg = new RegExp(keyword);
            if (item.match(reg)) {
                filtered.push(item);
            }
        });
        console.log(filtered);

        this.res.htmlRender({books: filtered}, false);
    }
}

module.exports = BookController;
