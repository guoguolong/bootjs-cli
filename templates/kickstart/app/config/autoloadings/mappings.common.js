'use strict';

module.exports = {
    plugins: {
        bootjs: {
            router: {
                urlsMapping: {
                    '/kickstart/shop/comment/:goodsId?': {auth: {enabled: true}},                    
                    '/kickstart/music/:name': {
                        target: 'kickstart/product/search',
                        params: {
                            categoryId: 1897,
                            style: 'American Country'
                        }
                    },
                }
            }
        }
    }
};