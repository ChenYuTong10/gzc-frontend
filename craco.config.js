const CracoLessPlugin = require('craco-less');

// More details to customize theme seeing https://ant.design/docs/react/customize-theme.
// More the 'less' variables seeing https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less.
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "#318640",
                            "@font-size-base": "16px"
                            // "@input-height-lg": "56px",
                            // "@input-padding-horizontal-lg": "24px",
                            // "@select-single-item-height-lg": "48px",
                            // "@select-dropdown-height": "48px",
                            // "@select-dropdown-font-size": "16px"
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};