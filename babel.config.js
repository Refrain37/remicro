module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                exclude: ['@babel/plugin-transform-regenerator'],
            },
        ],
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
};