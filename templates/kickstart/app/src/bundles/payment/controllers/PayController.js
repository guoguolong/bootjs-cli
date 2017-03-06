'use strict';

class PayController {
    index() {
        this.res.end('<h1>Pay something in local "payment" bundle.</h1>');
    }
}
module.exports = PayController;