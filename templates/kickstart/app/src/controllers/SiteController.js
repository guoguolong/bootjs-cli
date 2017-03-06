/**
 * 异常处理.
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

class SiteController {
    exception() {
        if(this.res.statusCode == 404) {
            this.res.htmlRender(this.req.params, false, "site/404");
        } else {
            this.res.htmlRender(this.req.params);
        }
    }
}

module.exports = SiteController;
