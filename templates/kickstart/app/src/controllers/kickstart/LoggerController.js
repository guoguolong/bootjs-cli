/**
 * 示例Log日志.
 *
 * @author guojunlong@kaulware.com (Allen Guo)
 * @copyright Copyright &copy; 2017 Kaulware.com
 */
'use strict';
class LoggerController {
    output() {
        this.ctx.logger.trace('Entering cheese testing');
        this.ctx.logger.debug('Got cheese.');
        this.ctx.logger.info('Cheese is Gouda.');
        this.ctx.logger.warn('Cheese is quite smelly.');
        this.ctx.logger.error('Cheese is too ripe!');
        this.ctx.logger.fatal('Cheese was breeding ground for listeria.');

        this.res.htmlRender();
    }    
}

module.exports = LoggerController;