'use strict';

let appBaseDir = __dirname + '/../';
module.exports = {
    appName: '{project_name}',
    appId: '{project_name}',
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
                port: 6379
            }
        }
    },
    cookies: {
        secretKey: 'lifeissimpebutyoumadeitcomplicated'
    }
};