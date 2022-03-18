import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';
import { BehaviorSubject, fromEvent } from 'rxjs';

class Main extends RootComponent {
    constructor(props: IRootComponent) {
        super(props);
    }
}

export default Main;
