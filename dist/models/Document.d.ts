import { IDEnabled } from '../types/IDEnabled';
import { CollectionHolder } from './reservedTypes/CollectionHolder';
import { immerable } from 'immer';
import { DocumentReference } from '../types';
export declare class Document<DataType extends IDEnabled, SubCollections> implements CollectionHolder<SubCollections> {
    collections: SubCollections;
    data: Readonly<DataType>;
    reference: DocumentReference;
    [immerable]: boolean;
    constructor(data: DataType, reference?: DocumentReference, subCollections?: SubCollections);
    setReferenceToSubCollections(): void;
    id(): string;
    modifyData(newData: Partial<DataType>): DataType;
}
