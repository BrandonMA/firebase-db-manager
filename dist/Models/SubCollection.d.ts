import { Collection } from './Collection';
export declare class SubCollection<DataType, SubCollections> extends Collection<DataType, SubCollections> {
    previousPath: string | null;
    constructor(id: string, subCollections: SubCollections | null);
    setReference(previousPath: string): void;
    getFullPath(): string;
}
