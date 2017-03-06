'use strict';

class SessionController {
    write(username) {
        if (!username) username = 'Default User';
        this.req.session.username = username;
        this.res.send('URL最后一个参数就是要写入Session.username的值，你写入了：' + username);
    }
    read() {
        this.res.send('Session.username: ' + this.req.session.username);
    }
}
module.exports = SessionController;