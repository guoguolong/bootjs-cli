/**
 * 示例带命名参数和正则表达式参数获取
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';
class TravelController {
    index(productId) {
        this.res.writeHead(200, {'Content-type' : 'text/html'});
        let ret = 'Travel productId: ' + productId + '<br/>';
        this.res.end(ret);
    }    
    detail(cityLetter) {
        this.res.writeHead(200, {'Content-type' : 'text/html'});
        this.res.end('Travel CityLetter: ' + cityLetter);
    }
}

module.exports = TravelController;