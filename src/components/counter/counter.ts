import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';
import { BehaviorSubject, fromEvent } from 'rxjs';

class Counter extends RootComponent<HTMLDivElement> {
    readonly input: HTMLInputElement;
    readonly prevButton: HTMLButtonElement;
    readonly nextButton: HTMLButtonElement;
    readonly valueCounter: HTMLDivElement;

    public count$ = new BehaviorSubject(0);
    public valueCounter$ = new BehaviorSubject(0);

    constructor(props: IRootComponent) {
        super(props);

        this.input = this.node.querySelector(`.counter__value`);
        this.prevButton = this.node.querySelector<HTMLButtonElement>(`.counter__button-prev`);

        this.nextButton = this.node.querySelector<HTMLButtonElement>(`.counter__button-next`);

        this.valueCounter = this.node.querySelector(`.counter__value`);

        fromEvent([this.prevButton, this.nextButton], 'click').subscribe((target) => {
            const button = target.target as HTMLButtonElement;

            const isPrev = button.classList.contains(`counter__button-prev`);

            const value = this.count$.getValue() + (isPrev ? -1 : 1);
            this.setCount(value);
            this.valueCounter$.next(this.valueCounter$.getValue() + (isPrev ? -1 : 1));
        });

        this.count$.subscribe((target) => (this.input.value = target.toString()));

        this.valueCounter$.subscribe((target) => (this.valueCounter.innerHTML = `Value: ${target}`));
    }

    public setCount = (count: number) => this.count$.next(count);
}

export default Counter;
