const path = require('path');
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
    const dist = path.resolve(`packages/${package}/dist`);
    utils.delDir(dist);
}