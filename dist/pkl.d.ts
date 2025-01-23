export declare class Pkl {
    private data;
    constructor(pklStr: string);
    get(path: string): any;
    toJSON(): string;
    toString(): string;
}
