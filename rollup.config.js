/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import ts from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

if (!process.env.pkgName) {
    throw new Error('package must be specified via --environment flag.');
}

const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, process.env.pkgName);
const concat = p => path.resolve(packageDir, p);
const pkg = require(concat(`package.json`));

const babelConfig = {
    babelHelpers: 'bundled',
    extensions: ['.ts', 'js'],
    exclude: [
        '*.config.js',
        'packages/**/node_modules/*.d.ts',
        'node_modules/*.d.ts',
        '**/dist/**/*',
        '**/demo/*',
        '**/__tests__/**/*',
    ],
};

const rollupConfig = [{
        input: concat('src/index.ts'),
        output: [{
                file: concat('dist/index.esm.js'),
                format: 'esm',
                exports: 'named',
            },
            {
                file: concat('dist/index.cjs.js'),
                format: 'cjs',
                exports: 'named',
            },
        ],
        external: [
            ...Object.keys(pkg.devDependencies || {}),
            ...Object.keys(pkg.dependencies || {}),
            ...(pkg.external || []),
        ],
        plugins: [resolve(), ts(), babel(babelConfig), commonjs(), json()],
    },
    {
        input: concat('src/index.ts'),
        output: {
            file: concat('dist/index.d.ts'),
            format: 'esm',
            exports: 'named',
        },
        plugins: [dts()],
    },
];

export default rollupConfig;