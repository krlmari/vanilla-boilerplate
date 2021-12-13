export enum FileType {
    TS = 'ts',
    PUG = 'pug',
    SCSS = 'scss',
}

export interface ITemplate {
    tpl: string;
    ext: FileType;
}
