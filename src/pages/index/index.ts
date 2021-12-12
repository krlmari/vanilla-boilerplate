import { IView, IViewData } from '@barba/core';
import Counter from '@components/counter/counter';
import { findComponents } from '@common/utils';

export default {
    namespace: 'index',
    beforeEnter(data: IViewData) {},
    afterEnter(data: IViewData) {
        const counters = findComponents('counter').map(
            (component) => new Counter(component)
        );
    },
} as IView;
