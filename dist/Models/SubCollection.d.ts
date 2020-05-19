import { Collection } from './Collection';
import { IDEnabled } from '../Types';
export declare class SubCollection<DataType extends IDEnabled, SubCollections> extends Collection<DataType, SubCollections> {
    previousPath: string | null;
    constructor(id: string, subCollections: SubCollections);
    setReference(previousPath: string | null): void;
    getFullPath(): string;
}
