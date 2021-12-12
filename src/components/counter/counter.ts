import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';

class Counter extends RootComponent<HTMLDivElement> {
    public value: number;
    public minusButton: HTMLButtonElement;
    public plusButton: HTMLButtonElement;
    public input: HTMLInputElement;

    constructor(props: IRootComponent) {
        super(props);

        this.value = 0;
        this.minusButton = this.findNode<HTMLButtonElement>('minus').node;
        this.plusButton = this.findNode<HTMLButtonElement>('plus').node;
        this.input = this.findNode<HTMLInputElement>('value').node;

        this.minusButton.addEventListener('click', this.onMinus);
        this.plusButton.addEventListener('click', this.onPlus);
    }

    public updateValue = (value: string) => {
        this.input.value = value;
    };

    private onMinus = () => {
        this.value -= 1;

        this.updateValue(this.value.toString());
    };

    private onPlus = () => {
        this.value += 1;

        this.updateValue(this.value.toString());
    };

    destroy = () => {
        this.minusButton.removeEventListener('click', this.onMinus);
        this.plusButton.removeEventListener('click', this.onPlus);
    };
}

export default Counter;
