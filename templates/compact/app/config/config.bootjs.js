'use strict';
var appBaseDir = __dirname + '/../';
module.exports = {
    plugins : {
        bootjs: {
            moduleName: 'bootjs',
            baseDir: appBaseDir + 'src/',
            router: {
                autoUrlPrefix: false,
                urlsMapping: {
                },
                urlsPrefix: [
                ]
            },
            bundles: {
                panel: {
                    secretKey: 'nothingisimportant',
                }
            },
            exception: {
                debug: false,
            }
        }
    }
};
