/**
 * 与后端交互图书数据
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

class BookService {
    __construct() {
        this.books = this.ctx.config.samples.books;
    }

    /**
     * 根据关键字查找产品名字匹配的产品，并返回.
     * @returns {array} - 符合条件的产品列表并带有分页信息.
     */
    search(keyword) {
        let filtered = this.books;
        if (keyword) {
            filtered = [];
            this.books.forEach(function(item) {    
                let reg = new RegExp('(' + keyword + ')');
                if (item.name.match(reg)) {
                    item.name = item.name.replace(reg, '<span style="color:red">$1</span>');
                    filtered.push(item);
                }
            });
        }
        return {
            books: filtered,
            page: {
                pageNo: 1,
                pageSize: 10,
                pages: 24,
                totals: 245
            }
        };
    }

    get(id) {
        let thisProd = {};
        this.books.forEach(function(item) {
            if (item.id == id) {
                thisProd = item;
            }
        });
        return thisProd;
    }

    save(book) {
        book.id = parseInt(book.id);
        let isNew = false;
        let thisProd = null;
        let maxId = 0;
        this.books.forEach(function(item) {
            if (item.id === book.id) {
                thisProd = item;
            }
            if (item.id > maxId) {
                maxId = item.id;
            }
        });
        if (!thisProd) { // 插入操作
            isNew = true;
            thisProd = {
                id: ++maxId
            };
        }
        thisProd.name = book.name;
        thisProd.price = book.price;
        thisProd.author = book.author;
        thisProd.email = book.email;
        thisProd.isPromotion = book.isPromotion;
        if (isNew) {
            this.books.push(thisProd);
        }
        return thisProd;
    }

    remove(id) {
        id = parseInt(id);
        let result = false;
        this.ctx.config.samples.books = this.books.filter(item => {
            if (item.id == id) result = true;
            return item.id !== id; 
        });
        return result;
    }
}

module.exports = BookService;
