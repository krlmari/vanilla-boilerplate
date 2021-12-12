import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import commonConfig from './webpack.config';

const developmentConfig: Configuration = {
    mode: 'development',
    optimization: {
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    devServer: {
        port: 9000,
        hot: true,
        open: true,
    },
};

export default merge(commonConfig, developmentConfig);
