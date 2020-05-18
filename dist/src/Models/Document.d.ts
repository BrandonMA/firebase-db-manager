import { CollectionHolder } from '../Types/CollectionHolder';
import { DataHolder } from '../Types/DataHolder';
export declare class Document<DataType, SubCollections> implements CollectionHolder<SubCollections> {
    collections: SubCollections | null;
    data: DataHolder<DataType>;
    previousPath: string;
    constructor(data: DataHolder<DataType>, previousPath: string, subCollections: SubCollections | null);
}
