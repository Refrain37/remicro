const fs = require('fs');

function getArg(name) {
    const args = process.argv.slice(2);
    for (const a of args) {
        if (a.indexOf(name) != '-1') {
            return a.split('=')[1];
        }
    }
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

function delDir(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(f => {
            const currPath = `${path}/${f}`;
            if (fs.statSync(currPath).isDirectory()) {
                delDir(currPath);
            } else {
                fs.unlinkSync(currPath);
            }
        });
        fs.rmdirSync(path);
    }
}

module.exports = {
    getArg,
    runParallel,
    getPackages,
    delDir,
};