import { immerable } from 'immer';
import { DocumentReference, IDEnabled } from '../types';
import { CollectionHolder } from '../types/reserved/CollectionHolder';
export declare class Document<DataType extends IDEnabled, SubCollections> implements CollectionHolder<SubCollections> {
    collections: SubCollections;
    data: Readonly<DataType>;
    reference: DocumentReference;
    [immerable]: boolean;
    constructor(data: DataType, reference: DocumentReference, subCollections: SubCollections);
    setReferenceToSubCollections(): void;
    id(): string;
    modifyData(newData: Partial<DataType>): DataType;
}
