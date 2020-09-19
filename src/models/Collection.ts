import { IDEnabled } from '../types/IDEnabled';
import { isCollectionReference, CollectionReference } from '../types/CollectionReference';
import { v4 as uuidv4 } from 'uuid';
import { Document } from './Document';
import shareDatabaseReference from './shareDatabaseReference';
import produce from 'immer';
import { SortingPredicate, FilterPredicate, PaginationPredicate } from '../types';
import { CollectionData } from '../types/reserved/CollectionData';
import { CollectionHolder } from '../types/reserved/CollectionHolder';
import { Query } from '../types/FirebaseQuery';

export class Collection<DataType extends IDEnabled, SubCollections> implements IDEnabled, CollectionHolder<SubCollections>, CollectionData {
    id: string;
    collections: SubCollections;
    reference: CollectionReference | null;
    private subscriptions: Array<() => void> = [];
    private nextVisibleIndex: number;

    constructor(id: string, subCollections: SubCollections) {
        this.id = id;
        this.reference = null;
        this.collections = subCollections;
        this.nextVisibleIndex = 0;
    }

    setReference(reference: CollectionReference): void {
        this.reference = reference;
        if (this.collections != null) {
            shareDatabaseReference(this.collections);
        }
    }

    // Document creation

    async createDocument(data: DataType, skipAwait?: boolean): Promise<Document<DataType, SubCollections>> {
        const reference = this.getCollectionReference();
        const id = data.id ? data.id : uuidv4();
        const newData = produce(data, (draft) => {
            draft.id = id;
        });
        const documentReference = reference.doc(id);
        if (skipAwait) {
            documentReference.set(newData, { merge: true });
        } else {
            await documentReference.set(newData, { merge: true });
        }
        return new Document(newData, documentReference, this.collections);
    }

    // Getting

    async getDocument(id: string): Promise<Document<DataType, SubCollections>> {
        const reference = this.getCollectionReference();
        const documentReference = reference.doc(id);
        const response = await documentReference.get();
        if (response.exists) {
            const data = response.data() as DataType;
            return new Document(data, documentReference, this.collections);
        } else {
            throw Error('Document does not exist, check your id');
        }
    }

    async get(
        sortingPredicate?: SortingPredicate,
        filterPredicate?: FilterPredicate,
        paginationPredicate?: PaginationPredicate,
        editQuery?: (reference: CollectionReference | Query) => Query
    ): Promise<Array<Document<DataType, SubCollections>>> {
        const reference = this.getCollectionReference();
        const query = this.getQuery(reference, sortingPredicate, filterPredicate, paginationPredicate, editQuery);
        const snapshot = await query.get();
        if (!snapshot.empty) {
            this.nextVisibleIndex += snapshot.size + 1; // Page size would be the index for the last document retreived, so add one.
            return snapshot.docs.map((firebaseDocument) => {
                const data = firebaseDocument.data() as DataType;
                return new Document(data, firebaseDocument.ref, this.collections);
            });
        } else {
            return [];
        }
    }

    // Updating

    async updateDocument(data: DataType): Promise<Document<DataType, SubCollections>> {
        const reference = this.getCollectionReference();
        const documentReference = reference.doc(data.id);
        await documentReference.update(data);
        return new Document(data, documentReference, this.collections);
    }

    // Deleting

    async deleteDocument(id: string): Promise<void> {
        const reference = this.getCollectionReference();
        await reference.doc(id).delete();
    }

    // Subscribing to changes

    subscribeToDocument(
        id: string,
        onDataChange: (document: Document<DataType, SubCollections>) => void,
        onError: (error: Error) => void,
        onDataDoesNotExist: () => void
    ): () => void {
        const reference = this.getCollectionReference();
        const subscription = reference.doc(id).onSnapshot(
            (snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data() as DataType;
                    const document = new Document(data, snapshot.ref, this.collections);
                    onDataChange(document);
                } else {
                    onDataDoesNotExist();
                }
            },
            (error) => {
                onError(error);
            }
        );
        this.subscriptions.push(subscription);
        return subscription;
    }

    subscribe(
        onDataChange: (documents: Array<Document<DataType, SubCollections>>) => void,
        onError: (error: Error) => void,
        sortingPredicate?: SortingPredicate,
        filterPredicate?: FilterPredicate,
        editQuery?: (reference: CollectionReference | Query) => Query
    ): () => void {
        const reference = this.getCollectionReference();
        const query = this.getQuery(reference, sortingPredicate, filterPredicate, undefined, editQuery);
        const subscription = query.onSnapshot(
            (snapshot) => {
                if (!snapshot.empty) {
                    const documents = snapshot.docs.map((firebaseDocument) => {
                        const data = firebaseDocument.data() as DataType;
                        return new Document(data, firebaseDocument.ref, this.collections);
                    });
                    onDataChange(documents);
                } else {
                    onDataChange([]);
                }
            },
            (error) => {
                onError(error);
            }
        );
        this.subscriptions.push(subscription);
        return subscription;
    }

    // Implementation is not final, we must pass an original reference, passing a new array everytime is kind of useless.
    subscribeWithDiffing(
        onDataChange: (document: Map<string, Document<DataType, SubCollections>>) => void,
        onError: (error: Error) => void,
        sortingPredicate?: SortingPredicate,
        filterPredicate?: FilterPredicate,
        editQuery?: (reference: CollectionReference | Query) => Query
    ): () => void {
        const reference = this.getCollectionReference();
        const query = this.getQuery(reference, sortingPredicate, filterPredicate, undefined, editQuery);
        const subscription = query.onSnapshot(
            (snapshot) => {
                if (!snapshot.empty) {
                    const map = new Map<string, Document<DataType, SubCollections>>();
                    snapshot.docChanges().forEach((change) => {
                        const data = change.doc.data() as DataType;
                        switch (change.type) {
                            case 'added':
                            case 'modified':
                                map.set(data.id, new Document(data, change.doc.ref, this.collections));
                                break;
                            case 'removed':
                                map.delete(data.id);
                                break;
                        }
                    });
                    onDataChange(map);
                }
            },
            (error) => {
                onError(error);
            }
        );
        this.subscriptions.push(subscription);
        return subscription;
    }

    // Utility Methods

    removeAllSubscriptions(): void {
        this.subscriptions.forEach((subscription) => subscription());
    }

    resetPagination(): void {
        this.nextVisibleIndex = 0;
    }

    private getCollectionReference(): CollectionReference {
        if (this.reference != null && isCollectionReference(this.reference)) {
            return this.reference;
        } else {
            throw Error('No reference set or is a document reference');
        }
    }

    private getQuery(
        reference: CollectionReference | Query,
        sortingPredicate?: SortingPredicate,
        filterPredicate?: FilterPredicate,
        paginationPredicate?: PaginationPredicate,
        editQuery?: (reference: CollectionReference | Query) => CollectionReference | Query
    ): CollectionReference | Query {
        let newReference = reference;
        if (sortingPredicate != null) {
            newReference = newReference.orderBy(sortingPredicate.property, sortingPredicate.direction);
        }
        if (filterPredicate != null) {
            newReference = newReference.where(filterPredicate.property, filterPredicate.direction, filterPredicate.value);
        }
        if (paginationPredicate != null) {
            if (paginationPredicate.page != null) {
                const lastIndex = paginationPredicate.pageSize * paginationPredicate.page + (paginationPredicate.page > 0 ? 1 : 0);
                newReference = newReference.startAt(lastIndex).limit(paginationPredicate.pageSize);
            } else {
                newReference = newReference.startAt(this.nextVisibleIndex).limit(paginationPredicate.pageSize);
            }
        }
        if (editQuery != null) {
            newReference = editQuery(newReference);
        }
        return newReference;
    }
}
