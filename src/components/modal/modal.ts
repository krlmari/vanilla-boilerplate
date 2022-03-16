import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';

class Modal extends RootComponent {
    constructor(props: IRootComponent) {
        super(props);
    }

    toggleOpen() {
        this.node.classList.toggle(`${this.name}--is-visible`);
    }
}

export default Modal;
