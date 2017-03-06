/**
 * Generator风格的Action方法
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';

module.exports = class {
    _getData() {
        return new Promise(function (resolve, reject) {
            require('request').get({url: 'http://sugg.us.search.yahoo.net/gossip-gl-location/?appid=weather&output=xml&command=%E5%8D%97%E4%BA%AC'}, (err, res, data)=> {
                return resolve(data);            
            });
        });
    }

    * index() {
        let data = yield this._getData();
        this.res.setHeader("Content-Type", "application/xml");
        this.res.htmlRender({content: data}, false);
    }
}
