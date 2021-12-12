import RootComponent from '@common/rootComponent';
import { IRootComponent } from '@common/types';
import { IViewData } from '@barba/core';

class Header extends RootComponent<HTMLDivElement> {
    constructor(props: IRootComponent) {
        super(props);

        this.updateActiveLink();
    }

    updateActiveLink = (data?: IViewData) => {
        const currentNamespace = data
            ? data.next.namespace
            : this.data.next.namespace;

        this.findNodes<HTMLDivElement>('link').forEach((link) => {
            const linkNamespace = link.node.getAttribute('data-namespace');
            linkNamespace === currentNamespace
                ? link.node.classList.add('active')
                : link.node.classList.remove('active');
        });
    };
}

export default Header;
