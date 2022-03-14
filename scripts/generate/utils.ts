import fs from 'fs';
import path from 'path';
import { compile } from 'handlebars';

import paths from '../../config/paths';

export const splitPath = (path: string) => path.split(/\\|\//);

export const logError = (error: NodeJS.ErrnoException) => console.log(error.message);

export const generateFile = (
    path: string,
    template: string,
    success?: () => void
) =>
    fs.writeFile(path, template, (err) => {
        if (!err) {
            success?.();
        } else {
            logError(err);
        }
    });

export const generateFromTemplate = (
    template: string,
    context: { [key: string]: string }
) => compile(template)(context);

export const addImport = (path: string, line: string, success?: () => void) =>
    fs.readFile(path, 'utf-8', (err, context) => {
        if (!err) {
            const imports = [
                ...context.split('\n').filter((str) => str.length),
                line,
            ].join('\n');

            fs.writeFile(path, imports, (err) => {
                if (!err) {
                    success?.();
                } else {
                    logError(err);
                }
            });
        } else {
            logError(err);
        }
    });

export const removeImport = (
    path: string,
    line: string,
    success?: () => void
) =>
    fs.readFile(path, 'utf-8', (err, context) => {
        if (!err) {
            fs.writeFile(path, context.replace(line, ''), (err) => {
                if (!err) {
                    success?.();
                } else {
                    logError(err);
                }
            });
        } else {
            logError(err);
        }
    });

export const generatePagesImports = (cb?: () => void) =>
    fs.readdir(paths.pages, (err, context) => {
        if (!err) {
            const pagesImports = [
                ...context.map(
                    (page) => `import ${page} from '@pages/${page}/${page}';`
                ),
                '',
                'export default [',
                ...context.map((page) => `    ${page},`),
                '];\n',
            ].join('\n');

            generateFile(path.join(paths.common, 'pages.ts'), pagesImports, cb);
        } else {
            logError(err);
        }
    });
