import { IView, IViewData } from '@barba/core';

import { findComponent } from '@common/utils';
import Main from '@components/main/main';
import Counter0 from '@components/counter/counter';
import Counter1 from '@components/counter/counter';
import Counter2 from '@components/counter/counter';
import Swiper from '@components/swiper/swiper';
import Modal from '@components/modal/modal';
import Button from '@components/button/button';

export default {
    namespace: 'index',
    beforeEnter(data: IViewData) {},
    afterEnter(data: IViewData) {
        const main = new Main(findComponent('main'));
        const counter0 = new Counter0(findComponent('counter0'));
        const counter1 = new Counter1(findComponent('counter1'));
        const counter2 = new Counter2(findComponent('counter2'));
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
                const activeSlider = (
                    document.querySelector(
                        '.swiper-slide-active input'
                    ) as HTMLInputElement
                ).value;
                document.querySelector('.main__counter').textContent =
                    activeSlider;
                modal.toggleOpen();
            },
        });
    },
} as IView;
