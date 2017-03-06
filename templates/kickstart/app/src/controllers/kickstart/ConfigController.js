'use strict';

const common = require('bootjs-common');
class ConfigController {
    index() {
        let content = common.utils.dump(this.ctx.config);
        this.res.htmlRender({config: content});
    }
}

module.exports = ConfigController;
