import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';

import { Navigation, Swiper as OriginalSwiper, SwiperOptions } from 'swiper';

class Swiper extends RootComponent {
    readonly swiperSlides: HTMLDivElement;
    readonly swiperButtonNext: HTMLButtonElement;
    readonly swiperButtonPrev: HTMLButtonElement;

    constructor(props: IRootComponent) {
        super(props);

        const swiperParams: SwiperOptions = {
            slidesPerView: 1,
            spaceBetween: 50,
            speed: 600,
            keyboard: {
                enabled: true,
            },
            hashNavigation: true,
            simulateTouch: false,
            modules: [Navigation],
            navigation: {
                nextEl: `.${this.name}-button-next`,
                prevEl: `.${this.name}-button-prev`,
            },
            on: {
                slideChange: function (swiper) {
                    window.location.hash = `#slide${swiper.realIndex}`;
                },
            },
        };

        const selector = `.${this.name}`;
        const swiper = new OriginalSwiper(selector, swiperParams);
    }
}

export default Swiper;
