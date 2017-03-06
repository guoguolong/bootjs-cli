/**
 * 示例bundles里使用urlsPrefix
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

class IndexController {
    index() {
        this.res.htmlRender();
    }
}

module.exports = IndexController;