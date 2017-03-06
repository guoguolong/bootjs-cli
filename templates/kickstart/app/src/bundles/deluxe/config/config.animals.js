'use strict';

module.exports = function(config) {
    return {
        animals: {
            from: config.params.source
        }
    };
}