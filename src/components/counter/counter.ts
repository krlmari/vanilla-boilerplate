import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';
import { BehaviorSubject, fromEvent } from 'rxjs';

class Counter extends RootComponent<HTMLDivElement> {
    readonly input: HTMLInputElement;
    readonly prevButton: HTMLButtonElement;
    readonly nextButton: HTMLButtonElement;
    readonly clickCount: HTMLDivElement;

    public count$ = new BehaviorSubject(0);
    public clickCount$ = new BehaviorSubject(0);

    constructor(props: IRootComponent) {
        super(props);

        this.input = this.node.querySelector(`.${this.name}__value`);
        this.prevButton = this.node.querySelector<HTMLButtonElement>(
            `.${this.name}__button-prev`
        );

        this.nextButton = this.node.querySelector<HTMLButtonElement>(
            `.${this.name}__button-next`
        );

        this.clickCount = this.node.querySelector(`.${this.name}__value`);

        fromEvent([this.prevButton, this.nextButton], 'click').subscribe(
            (target) => {
                const button = target.target as HTMLButtonElement;
                const isPrev = button.classList.contains(
                    `${this.name}__button-prev`
                );

                const value = this.count$.getValue() + (isPrev ? -1 : 1);
                this.setCount(value);
                this.clickCount$.next(this.clickCount$.getValue() + 1);
            }
        );

        this.count$.subscribe(
            (target) => (this.input.value = target.toString())
        );

        this.clickCount$.subscribe(
            (target) => (this.clickCount.innerHTML = `Clicks: ${target}`)
        );
    }

    public setCount = (count: number) => this.count$.next(count);
}

export default Counter;
