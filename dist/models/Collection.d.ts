import { CollectionReference, IDEnabled, SortingPredicate, FilterPredicate, PaginationPredicate } from '../types';
import { Document } from './Document';
import { immerable } from 'immer';
import { ReferenceHolder } from '../types/CollectionData';
import { Query } from '../types/FirebaseQuery';
import { Optional } from 'utility-types';
export declare class Collection<DataType extends IDEnabled, SubCollections> implements IDEnabled, ReferenceHolder {
    id: string;
    collections: SubCollections;
    private reference;
    [immerable]: boolean;
    constructor(id: string, subCollections: SubCollections);
    setReference(reference: CollectionReference): Collection<DataType, SubCollections>;
    createDocument(data: Optional<DataType, 'id'>, skipAwait?: boolean, merge?: boolean): Promise<Document<DataType, SubCollections>>;
    getDocument(id: string): Promise<Document<DataType, SubCollections>>;
    getDocuments(sortingPredicate?: SortingPredicate, filterPredicate?: FilterPredicate, paginationPredicate?: PaginationPredicate, editQuery?: (reference: CollectionReference | Query) => Query): Promise<Array<Document<DataType, SubCollections>>>;
    setDocument(newData: DataType): Promise<Document<DataType, SubCollections>>;
    updateDocument(data: DataType): Promise<Document<DataType, SubCollections>>;
    deleteDocument(id: string): Promise<void>;
    deleteCollection(): Promise<void>;
    subscribeToDocument(id: string, onDataChange: (document: Document<DataType, SubCollections>) => void, onError: (error: Error) => void, onDataDoesNotExist: () => void): () => void;
    subscribeToDocuments(onDataChange: (documents: Array<Document<DataType, SubCollections>>) => void, onError: (error: Error) => void, sortingPredicate?: SortingPredicate, filterPredicate?: FilterPredicate, editQuery?: (reference: CollectionReference | Query) => Query): () => void;
    private getCollectionReference;
    private getQuery;
}
