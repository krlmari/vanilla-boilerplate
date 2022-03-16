import { IView, IViewData } from '@barba/core';

import { findComponent } from '@common/utils';
import Main from '@components/main/main';
import Counter from '@components/counter/counter';
import Swiper from '@components/swiper/swiper';
import Modal from '@components/modal/modal';
import Button from '@components/button/button';

export default {
    namespace: 'index',
    beforeEnter(data: IViewData) {},
    afterEnter(data: IViewData) {
        const main = new Main(findComponent('main'));
        const counter = new Counter(findComponent('counter'));
        const swiper = new Swiper(findComponent('swiper'));
        const modal = new Modal(findComponent('modal'));

        const openModalBtn = new Button(
            findComponent('button--open-modal-btn'),
            {
                onClick: () => {
                    modal.toggleOpen();
                },
            }
        );

        const closeModalBtn = new Button(findComponent('modal__button-close'), {
            onClick: () => {
                modal.toggleOpen();
            },
        });
    },
} as IView;
