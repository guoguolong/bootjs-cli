'use strict';

module.exports = {
    plugins : {
        bootjs: {
            router: {
                urlsMapping: {
                    '/order/search': '/order/list',
                    '/kickstart/order/cart/detail/:id': {params: {username: 'Koda', password: 'IHATEYOU'}},
                    '/order/update/:id': {method: 'get', target: '/order/edit'}
                }
            }
        }
    }
};
