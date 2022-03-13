export default `import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';

class {{ name }} extends RootComponent {
    constructor(props: IRootComponent) {
        super(props);
    }
}

export default {{ name }};`;
