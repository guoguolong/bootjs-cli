#!/usr/bin/env node

'use strict';
const fs = require('fs');
const path = require('path');
const program = require('commander');
const mkdirp = require('mkdirp');
const readline = require('readline');
const pkg = require('../package.json');
const artFont = require('../lib/ArtFont.js');

let projInfo = {};
program
    .version(pkg.version);

program
    .command('init <project_name>')
    .option('-d, --dir <path>', 'The directory to create project.')
    .option('-t, --template <template name>', 'Template name to clone.')
    .description('create a new project')
    .action(function(project_name, options) {
        if (!project_name) return;
        project_name = project_name.toLowerCase();
        let proArr = project_name.split(':');
        if (proArr[1]) {
            projInfo.subSystem = proArr[0];
            projInfo.projectName = proArr[1];
        } else {
            projInfo.subSystem = 'sub';
            projInfo.projectName = proArr[0];
        }

        if (!options.dir) {
            options.dir = path.join(process.cwd(), projInfo.projectName);
        }
        init(projInfo.projectName, options);
    });

program.on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ bootjs-cli init kickstart # 创建一个带有quickstart的项目');
    console.log('    $ bootjs-cli init --template=compact quickstart # 创建一个干净的项目');
    console.log('    $ bootjs-cli init --template=compact mgr:planet # 创建一个类别名为mgr、项目名为planet的项目');
    console.log('    $ bootjs-cli init --template=mini quickstart # 创建一个最小化的项目');
    console.log('    $ bootjs-cli init --dir=/proj/kickstart kickstart # 指定目录创建项目');
    console.log();
}).parse(process.argv);

if (process.argv.length <= 2) {
    program.outputHelp(function(txt) {
        return txt;
    });
}

function init(project_name, options) {
    if (fs.existsSync(options.dir)) {
        console.info('目标目录: ' + options.dir + ' 已经存在, 请换一个再试.');
        process.exit(1);
    }
    console.log('即将创建项目到' + options.dir);
    process.stdin.destroy();
    mkdirp(options.dir, function() {
        let tmpName = options.template || 'kickstart';
        _init(project_name, options, tmpName);
    });
}

function confirm(msg, callback) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(msg, function(input) {
        rl.close();
        callback(/^y|yes|ok|true$/i.test(input));
    });
}

function _replacePlaceholders(files, target) {
    target = target || {};
    files.forEach(function(filePath) {
        if(!fs.existsSync(filePath)) return;

        let text = fs.readFileSync(filePath, 'utf8');

        target.projectName = target.projectName || 'PRO'
        text = text.replace(/\{project_name\}/g, target.projectName);
        text = text.replace(/\{PROJECT_NAME\}/g, target.projectName.toUpperCase());

        target.subSystem = target.subSystem || 'SUB';
        text = text.replace(/\{sub_system\}/g, target.subSystem);
        text = text.replace(/\{SUB_SYSTEM\}/g, target.subSystem.toUpperCase());
        text = text.replace(/\{project_name_art\}/g, target.projectNameArt);

        fs.writeFileSync(filePath, text);
    });
}

function _init(project_name, options, templatesName) {
    let copy = require('recursive-copy');
    templatesName = templatesName || 'kickstart';
    let src = path.join(__dirname, "/../templates/" + templatesName);
    if (!fs.existsSync(src)) {
        console.error('指定的模板【'+ templatesName +'】不存在');
        process.exit(1);
    }
    copy(src, options.dir, {dot: true})
        .then(function(results) {
            createGitignoreFile(options.dir);
            console.info('Step 1: Copied ' + results.length + ' files.');
            // template替换.
            projInfo.projectNameArt = artFont.genWords(projInfo.projectName).join('@');
            projInfo.projectNameArt = projInfo.projectNameArt
                .replace(/'/, '\\\'')
                .replace(/\\/g, '\\\\')
                .replace(/@/g, '\\n');

            _replacePlaceholders([
                options.dir + '/app/config/config.js',
                options.dir + '/app/src/controllers/IndexController.js',
                options.dir + '/package.json',
                options.dir + '/app.js',
            ], projInfo);

            console.info('Step 2: Compiled template files.');

            console.info('Step 3: Starting "npm install"');
            // 执行npm更新包 
            let child_process = require('child_process');
            let cmd = 'cd ' + options.dir + ' && npm install ';
            let working = child_process.exec(cmd, function(err, stdout, stderr) {
                if (err) throw err;
                console.info('Module dependencies installed.');
                hookCompleted(project_name, options);
            });
            working.stdout.on('data', function(data) {
                console.log(data);
            });

            working.stderr.on('data', function(data) {
                console.error(data);
            });
        })
        .catch(function(error) {
            console.error('Copy failed: ' + error);
        });
}

function hookCompleted(project_name, options) {
    console.log();
    console.log('**************************************************');
    console.log();
    console.log(' $> cd ' + options.dir);
    console.log(' Run ');
    console.log('    Windows: npm run win.start"');
    console.log('    Non-Windows: npm run local.start"');
    console.log(' to start node on port 5000');
    console.log();
    console.log('**************************************************');
}

function createGitignoreFile(targetDir) {
    let items = [
        'var/logs/*',
        '!var/logs/.gitkeep',
        'app/modules/*',
        '!app/.gitkeep',
        '**/.DS_Store',
        'node_modules    ',
    ];
    fs.writeFileSync(path.join(targetDir, '.gitignore'), items.join('\n'));
}