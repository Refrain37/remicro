const path = require('path');
const { exec } = require('child_process');
const utils = require('./utils');

const package = utils.getArg('name') || '';

start();

async function start() {
    if (package) {
        await clean(package);
    } else {
        await cleanAll();
    }
}

async function cleanAll() {
    const packages = utils.getPackages();
    await utils.runParallel(require('os').cpus().length, packages, clean);
}

async function clean(package) {
    // exec('rm -rf ./dist', (err, stdout, stderr) => {
    //     console.log(package, stdout);
    // });
}