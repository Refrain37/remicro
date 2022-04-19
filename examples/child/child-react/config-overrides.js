module.exports = {
    webpack: config => {
        return config;
    },

    devServer: _ => {
        const config = _;

        config.port = 3001;
        config.headers = {
            'Access-Control-Allow-Origin': '*',
        };
        return config;
    },
};