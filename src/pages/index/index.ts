import { IView, IViewData } from '@barba/core';

import { findComponent } from '@common/utils';
import Counter from '@components/counter/counter';
import Swiper from '@components/swiper/swiper';

export default {
    namespace: 'index',
    beforeEnter(data: IViewData) {},
    afterEnter(data: IViewData) {
        const swiper = new Swiper(findComponent('swiper'));
        const counter = new Counter(findComponent('counter'));
        console.log(counter);
    },
} as IView;
