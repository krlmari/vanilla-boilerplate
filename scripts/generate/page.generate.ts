import path from 'path';

import { EventEnum } from './types';

import paths from '../../config/paths';
import pagePug from '../templates/page/pug.template';
import pageScss from '../templates/scss.template';
import pageTs from '../templates/page/ts.template';

import {
    generateFile,
    generateFromTemplate,
    addImport,
    removeImport,
    generatePagesImports,
    splitPath,
} from './utils';

export const pageGenerate = (event: EventEnum, dir: string) => {
    const splitDir = splitPath(dir);
    const fsPath = splitDir.join('/');
    const name = splitDir.slice(-1)[0];

    const pathToFolder = fsPath.slice(fsPath.indexOf('pages'));
    const pagesScss = path.join(paths.styles, '_pages.scss');
    const importScss = `@import '../${pathToFolder}/${name}';\n`;

    if (event === EventEnum.AddDir) {
        generateFile(
            path.join(fsPath, `${name}.pug`),
            generateFromTemplate(pagePug, { name }),
            () =>
                generateFile(
                    path.join(fsPath, `${name}.scss`),
                    generateFromTemplate(pageScss, { name }),
                    () =>
                        addImport(pagesScss, importScss, () =>
                            generateFile(
                                path.join(fsPath, `${name}.ts`),
                                generateFromTemplate(pageTs, {
                                    name,
                                }),
                                () =>
                                    generatePagesImports(() =>
                                        console.log(
                                            'Page successfully generated'
                                        )
                                    )
                            )
                        )
                )
        );
    } else if (event === EventEnum.UnlinkDir) {
        removeImport(pagesScss, importScss, () => generatePagesImports());
    }
};
