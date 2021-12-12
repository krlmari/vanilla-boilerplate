import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import paths from './paths';

const pages = fs
    .readdirSync(paths.pages)
    .filter((page) => !/^\.[a-zA-Z_]/.test(page));

const entries = pages.reduce(
    (entry, page) => ({
        ...entry,
        [page]: `${paths.pages}/${page}/${page}.ts`,
    }),
    {}
);

const plugins = pages.map(
    (page) =>
        new HtmlWebpackPlugin({
            filename: `${page}.html`,
            template: `${paths.pages}/${page}/${page}.pug`,
            chunks: [page, 'common', 'vendors'],
        })
);

export default {
    pages,
    entries,
    plugins,
};
