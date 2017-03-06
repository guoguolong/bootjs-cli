/**
 * 图书相关的所有操作
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

const common = require('bootjs-common');
class CustomizeValidatorController {
    reqValidate() {
        this.req.sanitizeQuery('total').toInt();

        this.req.checkQuery('total', '总价格必须大于10').gte(10);
        var errors = this.req.validationErrors();
        this.res.json(errors);
    }

    validate(id) {
        // 直接使用validator校验错误.
        if (id && !this.ctx.validator.customizedIsInt(id)) { 
            let errors = [common.utils.assembleError('id', id, 'ID非法，请输入整数.')];
            let ret = this.res.json(errors);
            return;
        }
        this.res.end('PASSED');
    }
}

module.exports = CustomizeValidatorController;