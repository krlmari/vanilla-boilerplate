import fs from 'fs';
import { CommandType, ITemplate } from './types';

import paths from '../config/paths';
import {
    componentPug,
    componentTs,
    pagePug,
    pageTs,
    templateScss,
} from './templates';
import {
    generatePugImports,
    generateScssImports,
    generateTsImports,
} from './utils';

const pageTypes = [CommandType.Page, CommandType.P];
const componentTypes = [CommandType.Component, CommandType.C];

const type = process.argv[2];
const name = process.argv[3];
const title = process.argv[4];

export const generateFile = (
    filePath: string,
    template: ITemplate,
    cb?: () => void
) => {
    const path = `${filePath}/${name}/${name}.${template.ext}`;

    fs.writeFile(path, template.tpl, (err) => {
        if (!err) {
            console.log(`|- ${name}.${template.ext}`);
            cb?.();
        }
    });
};

if (type) {
    if (name) {
        if (componentTypes.includes(type as CommandType)) {
            const components = fs.readdirSync(paths.components);

            if (!components.includes(name)) {
                fs.mkdir(`${paths.components}/${name}`, () => {
                    console.log('');
                    console.log(`src/components/${name}`);
                    generateFile(paths.components, componentTs(name), () => {
                        generateFile(
                            paths.components,
                            componentPug(name),
                            () => {
                                generateFile(
                                    paths.components,
                                    templateScss(name),
                                    () =>
                                        generatePugImports((err) => {
                                            if (!err)
                                                generateScssImports((err) => {
                                                    if (!err) {
                                                        console.log('');
                                                        console.log(
                                                            `Компонент ${name} успешно сгенерирован!`
                                                        );
                                                        console.log('');
                                                    }
                                                });
                                        })
                                );
                            }
                        );
                    });
                });
            } else {
                console.log(`Компонент '${name}' уже существует.`);
            }
        } else if (pageTypes.includes(type as CommandType)) {
            if (title) {
                const pages = fs.readdirSync(paths.pages);

                if (!pages.includes(name)) {
                    console.log('');
                    console.log(`src/pages/${name}`);
                    fs.mkdir(`${paths.pages}/${name}`, () => {
                        generateFile(paths.pages, pageTs(name), () => {
                            generateFile(
                                paths.pages,
                                pagePug(name, title),
                                () => {
                                    generateFile(
                                        paths.pages,
                                        templateScss(name),
                                        () => {
                                            generateTsImports((err) => {
                                                if (!err)
                                                    generateScssImports(
                                                        (err) => {
                                                            if (!err) {
                                                                console.log('');
                                                                console.log(
                                                                    `Страница ${name} успешно сгенерирована!`
                                                                );
                                                                console.log('');
                                                            }
                                                        }
                                                    );
                                            });
                                        }
                                    );
                                }
                            );
                        });
                    });
                } else {
                    console.log(`Страница '${name}' уже существует.`);
                }
            } else {
                console.log('Не указан заголовок страницы.');
            }
        } else {
            console.log(`Тип '${type}' не существует.`);
        }
    } else {
        console.log('Не указан аргумент - имя.');
    }
} else {
    console.log('Ну указан агрумент - тип.');
}
