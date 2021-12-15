import {
    generatePugImports,
    generateScssImports,
    generateTsImports,
} from './utils';

console.log('');
generateTsImports((err) => {
    if (!err) {
        console.log('>> TS пути успешно сгенерированы.');

        generatePugImports((err) => {
            if (!err) {
                console.log('>> PUG пути успешно сгенерированы.');

                generateScssImports((err) => {
                    if (!err) {
                        console.log('>> SCSS пути успешно сгенерированы.');
                        console.log('');
                    }
                });
            }
        });
    }
});
