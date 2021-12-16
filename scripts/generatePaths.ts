import {
    generatePugImports,
    generateScssImports,
    generateTsImports,
} from './utils';

console.log('');
generateTsImports((err) => {
    if (!err) {
        console.log('>> TS импорты успешно сгенерированы.');

        generatePugImports((err) => {
            if (!err) {
                console.log('>> PUG импорты успешно сгенерированы.');

                generateScssImports((err) => {
                    if (!err) {
                        console.log('>> SCSS импорты успешно сгенерированы.');
                        console.log('');
                    }
                });
            }
        });
    }
});
