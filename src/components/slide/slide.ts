import Counter from '@components/counter/counter';

interface SlideData {
    src: string;
    alt: string;
    id: number;
}

class Slide {
    name: string;
    node: Element;
    counter: Counter;

    readonly data: SlideData;
    readonly templateSelector: string;

    constructor(data: SlideData, templateSelector: string) {
        this.data = data;
        this.templateSelector = templateSelector;
    }

    createNode() {
        return (document.querySelector(this.templateSelector) as any).content.firstElementChild.cloneNode(true);
    }

    getView() {
        this.node = this.createNode();
        this.name = `slide-${this.data.id}`;

        this.node.classList.add(this.name);

        const slideImg = this.node.querySelector('.swiper__image') as HTMLImageElement;
        slideImg.src = this.data.src;
        slideImg.alt = this.data.alt;

        const counterName = `counter-${this.name}`;
        const counterElement = this.node.querySelector('.counter');

        counterElement.classList.add(counterName);

        this.counter = new Counter({
            name: counterName,
            node: counterElement,
        });

        return this.node;
    }
}

export default Slide;
