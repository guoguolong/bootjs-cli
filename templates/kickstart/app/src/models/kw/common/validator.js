/**
 * 项目对validator的扩展.
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

const validator = require('validator');
validator.customizedIsInt = function(num) {
    return validator.isInt(num);
};

module.exports = validator;