"use strict";

const common = require('bootjs-common');
class AppError extends common.Error {
}

// AppError.codes['ROW_NOT_FOUND'] = 19025;
// AppError.messages[AppError.codes['ROW_NOT_FOUND']] = '记录未找到.';

module.exports = AppError;