// craco.config.js
module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    stream: require.resolve('stream-browserify'),
                },
            },
        },
    },
};
