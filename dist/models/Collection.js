var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { isCollectionReference } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Document } from './Document';
import produce, { immerable } from 'immer';
import batch from './batch';
export class Collection {
    constructor(id, subCollections) {
        this[_a] = true;
        this.id = id;
        this.reference = null;
        this.collections = subCollections;
    }
    setReference(reference) {
        return produce(this, (draft) => {
            draft.reference = reference;
        });
    }
    // Document creation
    createDocument(data, skipAwait, merge = true) {
        var _b;
        return __awaiter(this, void 0, void 0, function* () {
            const reference = this.getCollectionReference();
            const id = (_b = data.id) !== null && _b !== void 0 ? _b : uuidv4();
            const newData = produce(data, (draft) => {
                draft.id = id;
            });
            const documentReference = reference.doc(id);
            if (skipAwait) {
                documentReference.set(newData, { merge });
            }
            else {
                yield documentReference.set(newData, { merge });
            }
            return new Document(newData, documentReference, this.collections);
        });
    }
    // Getting
    getDocument(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reference = this.getCollectionReference();
            const documentReference = reference.doc(id);
            const response = yield documentReference.get();
            if (response.exists) {
                const data = response.data();
                return new Document(data, documentReference, this.collections);
            }
            else {
                throw Error('Document does not exist, check your id');
            }
        });
    }
    getDocuments(sortingPredicate, filterPredicate, paginationPredicate, editQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const reference = this.getCollectionReference();
            const query = this.getQuery(reference, sortingPredicate, filterPredicate, paginationPredicate, editQuery);
            const snapshot = yield query.get();
            if (!snapshot.empty) {
                return snapshot.docs.map((firebaseDocument) => {
                    const data = firebaseDocument.data();
                    return new Document(data, firebaseDocument.ref, this.collections);
                });
            }
            else {
                return [];
            }
        });
    }
    // Setting
    setDocument(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const reference = this.getCollectionReference();
            const documentReference = reference.doc(newData.id);
            yield documentReference.set(newData);
            return new Document(newData, documentReference, this.collections);
        });
    }
    // Updating
    updateDocument(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const reference = this.getCollectionReference();
            const documentReference = reference.doc(data.id);
            yield documentReference.update(data);
            return new Document(data, documentReference, this.collections);
        });
    }
    // Deleting
    deleteDocument(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reference = this.getCollectionReference();
            yield reference.doc(id).delete();
        });
    }
    deleteCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbBatch = batch();
            const collectionReference = this.getCollectionReference();
            const snapshot = yield collectionReference.get();
            if (!snapshot.empty) {
                snapshot.docs.forEach((doc) => dbBatch.delete(doc.ref));
                yield dbBatch.commit();
            }
        });
    }
    // Subscribing to changes
    subscribeToDocument(id, onDataChange, onError, onDataDoesNotExist) {
        const reference = this.getCollectionReference();
        return reference.doc(id).onSnapshot((snapshot) => {
            if (snapshot.exists) {
                const data = snapshot.data();
                const document = new Document(data, snapshot.ref, this.collections);
                onDataChange(document);
            }
            else {
                onDataDoesNotExist();
            }
        }, (error) => {
            onError(error);
        });
    }
    subscribeToDocuments(onDataChange, onError, sortingPredicate, filterPredicate, editQuery) {
        const reference = this.getCollectionReference();
        const query = this.getQuery(reference, sortingPredicate, filterPredicate, undefined, editQuery);
        return query.onSnapshot((snapshot) => {
            if (!snapshot.empty) {
                const documents = snapshot.docs.map((firebaseDocument) => {
                    const data = firebaseDocument.data();
                    return new Document(data, firebaseDocument.ref, this.collections);
                });
                onDataChange(documents);
            }
            else {
                onDataChange([]);
            }
        }, (error) => {
            onError(error);
        });
    }
    // Utility Methods
    getCollectionReference() {
        if (this.reference != null && isCollectionReference(this.reference)) {
            return this.reference;
        }
        else {
            throw Error('No reference set or is a document reference');
        }
    }
    getQuery(reference, sortingPredicate, filterPredicate, paginationPredicate, editQuery) {
        let newReference = reference;
        if (sortingPredicate != null) {
            newReference = newReference.orderBy(sortingPredicate.property, sortingPredicate.direction);
        }
        if (filterPredicate != null) {
            newReference = newReference.where(filterPredicate.property, filterPredicate.direction, filterPredicate.value);
        }
        if (paginationPredicate != null && paginationPredicate.page != null) {
            const lastIndex = paginationPredicate.pageSize * paginationPredicate.page + (paginationPredicate.page > 0 ? 1 : 0);
            newReference = newReference.startAt(lastIndex).limit(paginationPredicate.pageSize);
        }
        if (editQuery != null) {
            newReference = editQuery(newReference);
        }
        return newReference;
    }
}
_a = immerable;
//# sourceMappingURL=Collection.js.map