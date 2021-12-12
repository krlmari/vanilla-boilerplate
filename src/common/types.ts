import { IViewData } from '@barba/core';

export interface IRootComponent<T extends Element = Element> {
    name: string;
    node: T;
    data?: IViewData;
}

export interface IFindNode<T extends Element = Element> {
    selector: string;
    node: T;
}
