/**
 * HTTP请求默认进入的控制器文件
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

class IndexController {
    index() {
        if (this.ctx.bootjs.config.router.autoUrlPrefix) {
            return this.res.redirect('kickstart_default');
        } else {
            return this.res.redirect('kickstart');
        }
    }
}

module.exports = IndexController;
