import fs from 'fs';

import paths from '../config/paths';

const viewsTsPath = `${paths.common}/views.ts`;
const componentsPugPath = `${paths.common}/pug/components.pug`;
const componentsScssPath = `${paths.styles}/_components.scss`;
const pagesScssPath = `${paths.styles}/_pages.scss`;

export const generateTsImports = (cb: (e: NodeJS.ErrnoException) => void) => {
    const pages = fs.readdirSync(paths.pages);

    const newViewsImports = [
        ...pages.map((page) => `import ${page} from '@pages/${page}/${page}';`),
        '',
        'export default [',
        ...pages.map((page) => `    ${page},`),
        '];',
        '',
    ].join('\n');

    fs.writeFile(viewsTsPath, newViewsImports, cb);
};

export const generatePugImports = (cb: (e: NodeJS.ErrnoException) => void) => {
    const components = fs.readdirSync(paths.components);

    const componentsPugImports = [
        ...components.map(
            (component) => `include ../../components/${component}/${component}`
        ),
        '',
    ].join('\n');

    fs.writeFile(componentsPugPath, componentsPugImports, cb);
};

export const generateScssImports = (cb: (e: NodeJS.ErrnoException) => void) => {
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
        if (!err) fs.writeFile(pagesScssPath, pagesScssImports, cb);
    });
};
