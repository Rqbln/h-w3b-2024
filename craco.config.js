// craco.config.js
module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    reactScriptsVersion: "react-scripts",
                    stream: require.resolve('stream-browserify'),
                },
            },
        },
    },
};
