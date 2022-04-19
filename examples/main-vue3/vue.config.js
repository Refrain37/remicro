const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => ({
                ...options,
                compilerOptions: {
                    isCustomElement: tag => tag.startsWith('rm-'),
                },
            }));
    },
    devServer: {
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
});