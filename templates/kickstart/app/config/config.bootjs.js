'use strict';

let appBaseDir = __dirname + '/../';
let appAuthEntry = 'http://auth.kw.com';
module.exports = {
    plugins : {
        bootjs: {
            moduleName: 'bootjs',
            baseDir: appBaseDir + 'src/',
            thirdPartyBundle: {
                prefixes: ['bootjs-bundle-']
            },
            router: {
                autoUrlPrefix: false,
                urlsMapping: {
                    '/kickstart/goods/edit/:id/:name*': {method: 'all', target: '/kickstart/product/edit', paramSeq: ['id', 'name', '0']},
                    '/kickstart/product/list': {method: 'get', target: '/kickstart/product/confList'},
                    '/kickstart/travel/:productId(\\d+)': {method: 'get', target: '/kickstart/travel/index'},
                    '/kickstart/travel/:cityLetter(\\w{0,2})': {method: 'get', target: '/kickstart/travel/detail'},
                    '/kickstart/tour/(\\d+)': {method: 'get', target: '/kickstart/tour/index', type: 'regexp'},
                    '/kickstart/tour/([^\\d]{2})$': {method: 'get', target: '/kickstart/tour/detail', type: 'regexp'}
                },
                urlsPrefix: [
                    '/kickstart',
                    '/super',
                    '/order',
                ]
            },
            bundles: {
                panel: {
                    secretKey: 'lifeissimple',
                }
            },
            exception: {
                debug: false,
                exceptionHandler: '/site/exception'
            },
            auth: {
                clientType: 'pc',
                webFailureUrl: appAuthEntry + '/u/login',
                logoutUrl:  appAuthEntry + '/u/logout',
                loginUrl:  appAuthEntry + '/u/login',
            }
        }
    }
};
