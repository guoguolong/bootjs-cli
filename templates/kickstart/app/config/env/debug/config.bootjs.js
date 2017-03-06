'use strict';
var appBaseDir = __dirname + '/../../../';
module.exports = {
    plugins : {
        bootjs: {
            localModuleBaseDir: appBaseDir + 'modules/',
            thirdPartyBundle: {
                isLocal: true,
            },
            exception: {
                debug: true,
            },
        }
    }
};
