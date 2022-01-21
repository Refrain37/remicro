const path = require('path');
const execa = require('execa');
const utils = require('./utils');

const env = utils.getArg('env') || 'development';
const package = utils.getArg('name') || '';

start();

async function start() {
    if (package) {
        await build(package);
    } else {
        await buildAll();
    }
}

async function buildAll() {
    const packages = utils.getPackages();
    await utils.runParallel(require('os').cpus().length, packages, build);
}

async function build(package) {
    const pkgDir = path.resolve(`packages/${package}`);
    const pkg = require(`${pkgDir}/package.json`);

    if (pkg.private && !pkg.length) {
        return false;
    }

    // execute rollup -wc
    await execa(
        'rollup', [
            '-wc',
            `${path.resolve('rollup.config.dev.js')}`,
            '--environment', [`NODE_ENV:${env}`, `pkgName:${package}`].filter(Boolean).join(','),
        ], { stdio: 'inherit' }
    );
}