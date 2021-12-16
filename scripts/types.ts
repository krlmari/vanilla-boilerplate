export enum FileType {
    TS = 'ts',
    PUG = 'pug',
    SCSS = 'scss',
}

export enum CommandType {
    Component = 'component',
    C = 'c',
    Page = 'page',
    P = 'p',
}

export interface ITemplate {
    tpl: string;
    ext: FileType;
}
