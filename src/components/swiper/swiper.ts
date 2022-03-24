import { Navigation, Swiper as OriginalSwiper, SwiperOptions } from 'swiper';

import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';
import Slide from '@components/slide/slide';

import { slides } from './constants';

class Swiper extends RootComponent {
    swiper: OriginalSwiper;
    activeSliderEl: HTMLElement;

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
                slideChange: (swiper) => {
                    this.activeSliderEl = swiper.slides[swiper.activeIndex] as HTMLElement;
                },
            },
        };

        this.swiper = new OriginalSwiper(`.${this.name}`, swiperParams);
        this.renderSlides();
    }

    renderSlides() {
        const container = this.node.querySelector('.swiper-wrapper');

        const slidesToRender = slides.map((slideData) => {
            const slide = new Slide(slideData, '.slide-template');
            return slide.getView();
        });

        container.append(...slidesToRender);

        this.activeSliderEl = slidesToRender[0] as HTMLElement;
    }
}

export default Swiper;
