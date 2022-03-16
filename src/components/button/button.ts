import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';
import { fromEvent } from 'rxjs';

export interface ButtonHandlers {
    onClick?: (target: Event) => void;
}

class Button extends RootComponent {
    constructor(props: IRootComponent, handlers: ButtonHandlers) {
        super(props);

        if (this.node) {
            this.setEventListeners(handlers);
        }
    }

    setEventListeners(handlers: ButtonHandlers) {
        if (handlers.onClick) {
            fromEvent([this.node], 'click').subscribe(handlers.onClick);
        }
    }
}

export default Button;
