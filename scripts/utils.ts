import fs from 'fs';

import paths from '../config/paths';

const componentsScssPath = `${paths.styles}/_components.scss`;
const pageScssPath = `${paths.styles}/_pages.scss`;
const pageTsPath = `${paths.common}/views.ts`;

export const generateTsImports = (cb?: (e: NodeJS.ErrnoException) => void) => {
    const pages = fs.readdirSync(paths.pages);

    const newViewsImports = [
        ...pages.map((page) => `import ${page} from '@pages/${page}/${page}';`),
        '',
        'export default [',
        ...pages.map((page) => `    ${page},`),
        '];',
        '',
    ].join('\n');

    fs.writeFile(pageTsPath, newViewsImports, cb);
};

export const generateScssImports = (
    cb?: (e: NodeJS.ErrnoException) => void
) => {
    const components = fs.readdirSync(paths.components);
    const pages = fs.readdirSync(paths.pages);

    const componentsScssImports = [
        ...components.map(
            (component) => `@import '../components/${component}/${component}';`
        ),
        '',
    ].join('\n');

    const pagesScssImports = [
        ...pages.map((page) => `@import '../pages/${page}/${page}';`),
        '',
    ].join('\n');

    fs.writeFile(componentsScssPath, componentsScssImports, (err) => {
        if (!err) fs.writeFile(pageScssPath, pagesScssImports, cb);
    });
};
