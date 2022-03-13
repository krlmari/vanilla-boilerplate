import path from 'path';
import camelcase from 'camelcase';

import { EventEnum } from './types';

import paths from '../../config/paths';
import componentPug from '../templates/component/pug.template';
import componentScss from '../templates/scss.template';
import componentTs from '../templates/component/ts.template';

import {
    generateFile,
    generateFromTemplate,
    addImport,
    removeImport,
} from './utils';

export const componentGenerate = (event: EventEnum, dir: string) => {
    const name = dir.split('/').slice(-1)[0];
    const nameCamelCase = camelcase(name);
    const namePascalCase = camelcase(name, { pascalCase: true });
    const pathToFolder = dir.slice(dir.indexOf('components'));
    const componentsScss = path.join(paths.styles, '_components.scss');
    const importScss = `@import '../${pathToFolder}/${name}';\n`;

    if (event === EventEnum.AddDir) {
        generateFile(
            path.join(dir, `${name}.pug`),
            generateFromTemplate(componentPug, {
                name: nameCamelCase,
                className: name,
            }),
            () =>
                generateFile(
                    path.join(dir, `${name}.scss`),
                    generateFromTemplate(componentScss, { name }),
                    () =>
                        addImport(componentsScss, importScss, () =>
                            generateFile(
                                path.join(dir, `${name}.ts`),
                                generateFromTemplate(componentTs, {
                                    name: namePascalCase,
                                }),
                                () =>
                                    console.log(
                                        'Component successfully generated'
                                    )
                            )
                        )
                )
        );
    } else if (event === EventEnum.UnlinkDir) {
        removeImport(componentsScss, importScss);
    }
};
