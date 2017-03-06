/**
 * 购物车操作.
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

module.exports = class {
    * auth() {
        let UserAuth = require('bootjs-auth')(this.ctx.bootjs.config.auth);
        let auth = UserAuth.create(this.req, this.res, this.next);
        let msg = 'Not Login';
        let isLogin = yield auth.hasLoginP();
        if (isLogin) {
            msg = 'Has Login';
        }
        this.res.end('User ' + msg);
    }

    * comment(goodsId) {
        let userInfo = null;
        if (this.req.auth) {
            userInfo = yield this.req.auth.getLoginUserP();
        }
        userInfo = userInfo || {};
        return this.res.htmlRender({username: userInfo.nickname || userInfo.username || userInfo.id }, false);
    }

    * goods() {
        let userInfo = null;
        if (this.req.auth) {
            userInfo = yield this.req.auth.getLoginUserP();
        }
        userInfo = userInfo || {};
        return this.res.htmlRender({username: userInfo.nickname || userInfo.username || userInfo.id }, false);
    }
}