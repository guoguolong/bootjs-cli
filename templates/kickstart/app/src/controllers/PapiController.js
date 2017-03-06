/**
 * HTTP请求默认进入的控制器文件
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

module.exports = class {
    sso() {
        this.res.end('<script  charset="utf8" type="text/javascript">window.parent.__loginCallback();</script>');
    }
}
