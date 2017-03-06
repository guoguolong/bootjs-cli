;
(function(factory) {
    var obj = factory();
    if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
        module.exports = obj;
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return obj;
        });
    } else {
        this.auth = obj;
    }
})(function() {
    var loginStatus = isLogin(),
        globalCallbackName = 'detailLoginCallback',
        handlers = [],
        customOptions, callback, dialogId;

    function trim(str) {
        return String(str).replace(/(^\s+|\s+$)/, '');
    }

    function on() {
        handlers = handlers.concat([].slice.call(arguments));
    }

    function trigger(value) {
        for (var i = 0; i < handlers.length; i++) {
            if (typeof handlers[i] === 'function') {
                handlers[i](loginStatus);
            }
        }
    }

    function getIframeUrl() {
        if (customOptions && customOptions.iframeUrl) {
            if (typeof customOptions.iframeUrl === 'function') {
                return customOptions.iframeUrl();
            } else {
                return customOptions.iframeUrl;
            }
        } else {
            var originUrl = ['http://auth.kw.com/ssoConnect/Iframe'];
            originUrl.push('?');
            originUrl.push('reload=node');
            originUrl.push('&');
            originUrl.push('full_domain=', location.protocol, '//', location.host);
            return 'https://passport.kw.com/login/iframe?origin=' + encodeURIComponent(originUrl.join(''));
        }
    }

    function isLogin() {
        var list = document.cookie.split(';');
        var userId;
        for (var i = list.length - 1; i >= 0; i--) {
            var item = list[i].split('=');
            if (trim(item[0]) === 'kwuser') {
                userId = item[1];
                break;
            }
        }
        return !!userId;
    }

    function checkLogin() {
        var status = isLogin();
        if (status !== loginStatus) {
            loginStatus = status;
            trigger(status);
        }
    }

    function doLogin() {
        window[globalCallbackName] = afterLogin;
        dialogId = $.layer({
            type: 2,
            title: false,
            iframe: {
                src: getIframeUrl(),
                scrolling: 'auto'
            },
            area: ['375px', '350px'],
            btn: false,
            close: clearLogin
        });
    }

    function afterLogin() {
        layer.close(dialogId);
        if (callback) {
            callback();
        }
        checkLogin();
        clearLogin();
    }

    function clearLogin() {
        window[globalCallbackName] = null;
        callback = null;
        dialogId = null;
        customOptions = null;
    }
    return {
        on: on,
        getLoginStatus: function() {
            return {
                logged: isLogin()
            }
        },
        login: function(cb, options) {
            customOptions = options;
            if (isLogin()) {
                cb && cb();
            } else {
                callback = cb;
                doLogin();
            }
        }
    };
});