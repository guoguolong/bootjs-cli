'use strict';

const BootjsRender = require('bootjs-render');
module.exports = function(config) {
    const bootjsRender = BootjsRender(config.bootjs_render);
    return [
        bootjsRender.htmlRender,
        bootjsRender.autoRender,
        bootjsRender.apiRender,
    ]
}