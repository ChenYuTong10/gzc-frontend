const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": '#1DA57A',
                            "@link-color": "#2a6835b3"
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};