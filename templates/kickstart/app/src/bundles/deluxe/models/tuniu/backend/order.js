/**
 * 订单模型示例
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

exports.getDetail = function(orderNo) {
    return  {
        orderNo: orderNo,
        name: '小米电视3s',
        total: 3989
    };
};