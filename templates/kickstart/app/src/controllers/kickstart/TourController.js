/**
 * 示例带不带命名参数、但有正则表达式url配置的参数获取
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

class TourController {
    index(productId) {
        this.res.writeHead(200, {'Content-type' : 'text/html'});
        let ret = 'Tour productId: ' + productId + '<br/>';
        this.res.end(ret);
    }

    detail(cityLetter) {
        this.res.writeHead(200, {'Content-type' : 'text/html'});
        this.res.end('Tour CityLetter: ' + cityLetter);
    }

    page() {
        this.res.render('kickstart/tour/page', {layout:'kickstart/layout/base', title: '途牛不是屠牛', data: '这个就是定制的LAYOUT'})
    }
}

module.exports = TourController;