import chokidar from 'chokidar';

import paths from '../config/paths';
import { componentGenerate } from './generate/component.generate';
import { pageGenerate } from './generate/page.generate';

// Components
chokidar
    .watch(paths.components, {
        ignoreInitial: true,
    })
    .on('all', componentGenerate);

// Pages
chokidar
    .watch(paths.pages, {
        ignoreInitial: true,
    })
    .on('all', pageGenerate);
