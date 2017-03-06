/**
 * 示例bundles用法.
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

const common = require('bootjs-common');

class IndexController {
    index() {
        // 方法II.
        // let orderModel = importModel('kw.backend.order', 'deluxe'); 
        // let customerSrv = this.ctx.getService('kw.backend.CustomerService', 'deluxe');

        // 方法II.
        let orderModel = this.bundle.importModel('kw.backend.order'); 
        let customerSrv = this.bundle.getService('kw.backend.CustomerService');

        this.res.htmlRender({
            order: orderModel.getDetail(9820),
            address: customerSrv.getAddress(),
            bundleCfg: common.utils.dump(this.bundle.config),
        });
    }

    index2() {
        this.res.htmlRender(this.bundle.getViewPath('index/another_page')); // 方法1.
    }
}

module.exports = IndexController;