const path = require('path');
const execa = require('execa');
const utils = require('./utils');
const { priority } = require('./config');

const env = utils.getArg('env') || 'development';
const package = utils.getArg('name') || '';

start();

async function start() {
    if (package) {
        await build(package);
    } else {
        for (const p of priority) {
            await build(p, false);
        }
        await buildAll();
    }
}

async function buildAll() {
    const packages = utils.getPackages().filter(p => p !== 'remicro.js');
    await utils.runParallel(require('os').cpus().length, packages, build);
}

async function build(package, watch = true) {
    const pkgDir = path.resolve(`packages/${package}`);
    const pkg = require(`${pkgDir}/package.json`);

    if (pkg.private && !pkg.length) {
        return false;
    }

    const model = watch ? '-wc' : '-c';

    // execute rollup -wc
    await execa(
        'rollup', [
            model,
            `${path.resolve('rollup.config.dev.js')}`,
            '--environment', [`NODE_ENV:${env}`, `pkgName:${package}`].filter(Boolean).join(','),
        ], { stdio: 'inherit' }
    );
}