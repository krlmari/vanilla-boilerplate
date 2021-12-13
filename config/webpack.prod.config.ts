import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import commonConfig from './webpack.config';

const productionConfig: Configuration = {
    mode: 'production',
    output: {
        filename: 'js/[name].bundle-[chunkhash:8].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css',
        }),
    ],
};

export default merge(commonConfig, productionConfig);
