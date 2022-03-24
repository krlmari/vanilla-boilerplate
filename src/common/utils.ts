import { IRootComponent } from '@common/types';

export const findComponent = <T extends Element = Element>(name: string): IRootComponent<T> => ({
    name,
    node: document.querySelector(`.${name}`),
});

export const findComponents = <T extends Element = Element>(name: string): IRootComponent<T>[] =>
    Array.from(document.querySelectorAll(`.${name}`)).map((node: T) => ({
        name,
        node,
    }));
