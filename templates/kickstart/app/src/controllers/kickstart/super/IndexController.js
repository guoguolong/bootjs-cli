/**
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

class IndexController {
    index() {
        this.res.htmlRender({}, false);
    }
}

module.exports = IndexController;