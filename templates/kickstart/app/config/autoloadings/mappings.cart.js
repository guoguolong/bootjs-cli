'use strict';

module.exports = {
    plugins : {
        bootjs: {
            router: {
                urlsMapping: {
                    '/shopping/add': '/cart/add',
                    '/shopping/detail': {
                        target: '/cart/view',
                        method: 'get'
                    }
                }
            }
        }
    }
};
