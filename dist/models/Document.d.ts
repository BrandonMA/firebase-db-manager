import { immerable } from 'immer';
import { DocumentReference, IDEnabled } from '../types';
export declare class Document<DataType extends IDEnabled, SubCollections> {
    collections: SubCollections;
    data: Readonly<DataType>;
    [immerable]: boolean;
    constructor(data: DataType, reference?: DocumentReference, subCollections?: SubCollections);
    id(): string;
}
