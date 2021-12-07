const path = require('path');
const fs = require('fs');
const execa = require('execa');

start();

async function start() {
    await buildAll();
}

async function buildAll() {
    const packages = getPackages();
    await runParallel(require('os').cpus().length, packages, build);
}

async function build(package) {
    const pkgDir = path.resolve(`packages/${package}`);
    const pkg = require(`${pkgDir}/package.json`);

    if (pkg.private && !pkg.length) {
        return false;
    }

    // execute rollup -c
    await execa(
        'rollup', ['-c', '--environment', [`pkgName:${package}`].filter(Boolean).join(',')], { stdio: 'inherit' }
    );
}

async function runParallel(maxConcurrency, source, iteratorFn) {
    const ret = [];
    const executing = [];
    for (const item of source) {
        const p = Promise.resolve().then(() => iteratorFn(item, source));
        ret.push(p);

        if (maxConcurrency <= source.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= maxConcurrency) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(ret);
}

function getPackages() {
    const packages = [];
    fs.readdirSync('packages').forEach(f => {
        const pkg = require(`../packages/${f}/package.json`);
        if (!pkg.private || pkg.buildOptions) {
            packages.push(f);
        }
    });
    return packages;
}