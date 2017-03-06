"use strict";

const common = require('bootjs-common');
class AppError extends common.Error {
}

AppError.codes['USER_NOT_LOGIN'] = 19023;
AppError.codes['ROW_DELETED_FAILED'] = 19024;
AppError.codes['ROW_NOT_FOUND'] = 19025;

AppError.messages[AppError.codes['USER_NOT_LOGIN']] = '用户未登录.';
AppError.messages[AppError.codes['ROW_DELETED_FAILED']] = '行删除错误.';
AppError.messages[AppError.codes['ROW_NOT_FOUND']] = '记录未找到.';

module.exports = AppError;