import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';

class Main extends RootComponent {
    readonly openModalBtn: HTMLButtonElement;
    readonly modal: HTMLDivElement;

    constructor(props: IRootComponent) {
        super(props);
    }
}

export default Main;
