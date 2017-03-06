'use strict';

class PaymentController {
    pay() {
        this.res.htmlRender({
            title: 'Pay something in main application.',
            content: '尝试删除或修改$CTRL_DIR/PaymentController.js文件名，看看是否加载了bundle.'
        });
    }
}

module.exports = PaymentController;