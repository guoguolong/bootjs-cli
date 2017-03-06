/**
 * 两级路由的例子
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

class CartController {
    __construct() {
        this.products = [
            {id: 10, name: 'Mp3'},
            {id: 20, name: 'Apple touch.'}
        ]
    }

    list() {
        this.res.htmlRender({products: this.products});
    }

    detail(id) {
        let content = 'Product is not found.';
        let products = this.products.filter(item => item.id == id);
        let username = (this.username || 'Not Login');
        if (products.length >= 1) {
            content = username + "'s " + products[0].name;
        }
        this.res.htmlRender({content: content});
    }
}

module.exports = CartController;