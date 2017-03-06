/**
 * kickstart首页.
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

const common = require('bootjs-common');
class IndexController {
    index() {
        let resp = new common.HtmlResponse({
            title: 'Kickstart Samples(自动URL分组风格)'
        });
        this.res.htmlRender(resp);
    }

    forward() {
        this.res.forward('kickstart/product/edit', {id: 8988, name: 'FOWARD名字'});
    }

    redirect() {
        this.res.redirect('/kickstart/product/edit/22/REDIRECT名字');
    }
}

module.exports = IndexController;
