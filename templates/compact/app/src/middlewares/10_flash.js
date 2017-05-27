'use strict';

module.exports = function(config) {
    return function(req, res, next) {
        res.locals.flash = null;
        req.session = req.session || {};
        if (req.session.flash) {
            res.locals.flash = req.session.flash;
            delete req.session.flash;
        }
        next();
    };
}