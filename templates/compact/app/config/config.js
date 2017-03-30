'use strict';

let appBaseDir = __dirname + '/../';
module.exports = {
    appName: '{project_name}',
    debugMode: true,
    serverPort: 5000,
    appBaseDir: appBaseDir,
    srcBaseDir: appBaseDir + 'src/',
    importPaths: [
        appBaseDir + 'src/models'
    ],
    localModuleBaseDir: appBaseDir + 'modules/',
    session: {
        store: {
            redis: {
                host: "localhost",
                port: 6379,
                no_ready_check: true,
                retry_strategy: function (times) {
                    return Math.min(50, 2000);
                }
            }
        }
    },
    cookies: {
        secretKey: 'lifeissimpebutyoumadeitcomplicated'
    }
};