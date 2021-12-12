/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import ts from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

if (!process.env.pkgName) {
    throw new Error('current package must be specified via --environment flag.');
}

/* package config */
const isProduction = process.env.NODE_ENV === 'production';
const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, process.env.pkgName);
const concat = p => path.resolve(packageDir, p);
const pkg = require(concat(`package.json`));
const packageOptions = pkg.buildOptions || {};
const name = packageOptions.filename || path.basename(packageDir);

/* plugin configs */
const extensions = ['.ts', '.js', '.less', '.css'];
const babelConfig = {
    babelHelpers: 'bundled',
    extensions,
    exclude: [
        '*.config.js',
        'packages/**/node_modules/*.d.ts',
        'node_modules/*.d.ts',
        '**/dist/**/*',
        '**/demo/*',
        '**/__tests__/**/*',
    ],
};

const postcssConfig = {
    inject: true,
    mimimize: true,
    plugins: [
        autoprefixer({
            remove: false,
        }),
    ],
    extensions: ['.css', '.less'],
};

const rollupConfig = [{
        input: concat('src/index.ts'),
        output: [{
                file: concat('dist/index.esm.js'),
                format: 'esm',
                exports: 'named',
                sourcemap: !isProduction,
            },
            {
                file: concat('dist/index.cjs.js'),
                format: 'cjs',
                exports: 'named',
                sourcemap: !isProduction,
            },
        ],
        external: [
            ...Object.keys(pkg.devDependencies || {}),
            ...Object.keys(pkg.dependencies || {}),
            ...(pkg.external || []),
        ],
        plugins: [
            resolve({ extensions }),
            postcss(postcssConfig),
            ts(),
            babel(babelConfig),
            commonjs(),
            json(),
        ],
    },
    {
        input: concat('src/index.ts'),
        output: {
            file: concat('dist/index.umd.js'),
            format: 'umd',
            exports: 'named',
            name: 'rm' + name,
            sourcemap: !isProduction,
        },
        plugins: [
            resolve({ extensions }),
            postcss(postcssConfig),
            ts(),
            babel(babelConfig),
            commonjs(),
            json(),
        ],
    },
    {
        input: concat('src/index.ts'),
        output: {
            file: concat('dist/index.d.ts'),
            format: 'esm',
            exports: 'named',
        },
        external: [/\.less$/, /\.html$/],
        plugins: [dts()],
    },
];

export default rollupConfig;