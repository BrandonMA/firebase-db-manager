import { IDEnabled } from '../types/IDEnabled';
import { CollectionReference } from '../types/CollectionReference';
import { Document } from './Document';
import { SortingPredicate, FilterPredicate, PaginationPredicate } from '../types';
import { CollectionData } from '../types/reserved/CollectionData';
import { CollectionHolder } from '../types/reserved/CollectionHolder';
import { Query } from '../types/FirebaseQuery';
export declare class Collection<DataType extends IDEnabled, SubCollections> implements IDEnabled, CollectionHolder<SubCollections>, CollectionData {
    id: string;
    collections: SubCollections;
    reference: CollectionReference | null;
    private subscriptions;
    private nextVisibleIndex;
    constructor(id: string, subCollections: SubCollections);
    setReference(reference: CollectionReference): void;
    createDocument(data: DataType, skipAwait?: boolean): Promise<Document<DataType, SubCollections>>;
    getDocument(id: string): Promise<Document<DataType, SubCollections>>;
    get(sortingPredicate?: SortingPredicate, filterPredicate?: FilterPredicate, paginationPredicate?: PaginationPredicate, editQuery?: (reference: CollectionReference | Query) => Query): Promise<Array<Document<DataType, SubCollections>>>;
    updateDocument(data: DataType): Promise<Document<DataType, SubCollections>>;
    deleteDocument(id: string): Promise<void>;
    subscribeToDocument(id: string, onDataChange: (document: Document<DataType, SubCollections>) => void, onError: (error: Error) => void, onDataDoesNotExist: () => void): () => void;
    subscribe(onDataChange: (documents: Array<Document<DataType, SubCollections>>) => void, onError: (error: Error) => void, sortingPredicate?: SortingPredicate, filterPredicate?: FilterPredicate, editQuery?: (reference: CollectionReference | Query) => Query): () => void;
    subscribeWithDiffing(onDataChange: (document: Map<string, Document<DataType, SubCollections>>) => void, onError: (error: Error) => void, sortingPredicate?: SortingPredicate, filterPredicate?: FilterPredicate, editQuery?: (reference: CollectionReference | Query) => Query): () => void;
    removeAllSubscriptions(): void;
    resetPagination(): void;
    private getCollectionReference;
    private getQuery;
}
