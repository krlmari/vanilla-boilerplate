import fs from 'fs';
import rimraf from 'rimraf';

import { CommandType } from './types';
import paths from '../config/paths';

import {
    generatePugImports,
    generateScssImports,
    generateTsImports,
} from './utils';

const pageTypes = [CommandType.Page, CommandType.P];
const componentTypes = [CommandType.Component, CommandType.C];

const type = process.argv[2];
const name = process.argv[3];

if (type) {
    if (name) {
        if (componentTypes.includes(type as CommandType)) {
            const components = fs.readdirSync(paths.components);

            if (components.includes(name)) {
                rimraf(`${paths.components}/${name}`, (err) => {
                    if (!err)
                        generatePugImports((err) => {
                            if (!err)
                                generateScssImports((err) => {
                                    if (!err) {
                                        console.log('');
                                        console.log(
                                            `Компонент ${name} успешно удален!`
                                        );
                                        console.log('');
                                    }
                                });
                        });
                });
            } else {
                console.log(`Компонент '${name}' не существует.`);
            }
        } else if (pageTypes.includes(type as CommandType)) {
            const pages = fs.readdirSync(paths.pages);

            if (pages.includes(name)) {
                rimraf(`${paths.pages}/${name}`, (err) => {
                    if (!err)
                        generateTsImports((err) => {
                            if (!err)
                                generateScssImports((err) => {
                                    if (!err) {
                                        console.log('');
                                        console.log(
                                            `Страница ${name} успешно удалена!`
                                        );
                                        console.log('');
                                    }
                                });
                        });
                });
            } else {
                console.log(`Страница '${name}' не существует.`);
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
