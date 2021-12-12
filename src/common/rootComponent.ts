import { IViewData } from '@barba/core';
import { IRootComponent, IFindNode } from '@common/types';

class RootComponent<T extends Element = Element> {
    public name: string;
    public node: T;
    public data: IViewData;

    public destroy: () => void;

    constructor({ name, node, data }: IRootComponent) {
        this.name = name;
        this.node = node as T;
        this.data = data;
    }

    public findNode = <E extends Element>(
        selectorName: string,
        node?: IFindNode,
        separator = '__'
    ): IFindNode<E> => {
        const selector = `${
            node?.selector || `.${this.name}`
        }${separator}${selectorName}`;
        const rootNode = node?.node || this.node;

        return {
            selector,
            node: rootNode.querySelector(selector) as E,
        };
    };

    public findNodes = <E extends Element>(
        selectorName: string,
        node?: IFindNode,
        separator = '__'
    ): IFindNode<E>[] => {
        const selector = `${
            node?.selector || `.${this.name}`
        }${separator}${selectorName}`;
        const rootNode = node?.node || this.node;

        return Array.from(rootNode.querySelectorAll(selector)).map(
            (node: E) => ({
                selector,
                node,
            })
        );
    };
}

export default RootComponent;
