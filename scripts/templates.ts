import { FileType, ITemplate } from './types';

export const componentTs = (name: string): ITemplate => {
    const className = `${name[0].toUpperCase()}${name.slice(1)}`;

    const tpl = `import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';

class ${className} extends RootComponent {
    constructor(props: IRootComponent) {
        super(props);
    }
}

export default ${className};
`;

    return {
        tpl,
        ext: FileType.TS,
    };
};

export const componentPug = (name: string): ITemplate => {
    const tpl = `mixin ${name}
    .${name}
        `;

    return {
        tpl,
        ext: FileType.PUG,
    };
};

export const pageTs = (name: string): ITemplate => {
    const tpl = `import { IView, IViewData } from '@barba/core';

export default {
    namespace: '${name}',
    beforeEnter(data: IViewData) {},
    afterEnter(data: IViewData) {},
} as IView;
`;

    return {
        tpl,
        ext: FileType.TS,
    };
};

export const pagePug = (name: string, title: string): ITemplate => {
    const tpl = `extends ../../layouts/base

block head
    title ${title}

block content
    main(data-barba="container" data-barba-namespace="${name}")
`;

    return {
        tpl,
        ext: FileType.PUG,
    };
};

export const templateScss = (name: string): ITemplate => {
    const tpl = `.${name} {
}
`;

    return {
        tpl,
        ext: FileType.SCSS,
    };
};
