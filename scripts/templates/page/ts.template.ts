export default `import { IView, IViewData } from '@barba/core';

export default {
    namespace: '{{ name }}',
    beforeEnter(data: IViewData) {},
    afterEnter(data: IViewData) {},
} as IView;`;
