import { IDEnabled } from '../Types/IDEnabled';
import { CollectionHolder } from '../Types/CollectionHolder';
export declare class Document<DataType extends IDEnabled, SubCollections> implements CollectionHolder<SubCollections> {
    collections: SubCollections;
    data: Readonly<DataType>;
    previousPath: string;
    constructor(data: DataType, previousPath: string, subCollections: SubCollections);
    setReferenceToSubCollections(): void;
    id(): string;
    modifyData(newData: Partial<DataType>): DataType;
}
