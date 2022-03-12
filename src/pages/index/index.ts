import { IView, IViewData } from '@barba/core';

import { findComponent } from '@common/utils';
import Counter from '@components/counter/counter';

export default {
    namespace: 'index',
    beforeEnter(data: IViewData) {},
    afterEnter(data: IViewData) {
        const counter = new Counter(findComponent('counter'));
        console.log(counter);
    },
} as IView;
