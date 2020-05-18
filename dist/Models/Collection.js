"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const IDEnabled_1 = require("../Types/IDEnabled");
const CollectionReference_1 = require("../Types/CollectionReference");
const uuid_1 = require("uuid");
const Document_1 = require("./Document");
class Collection {
    constructor(id, subCollections) {
        this.id = id;
        this.db = null;
        this.reference = null;
        this.collections = subCollections;
    }
    setReference(previousPath) {
        if (this.db != null && previousPath == null) {
            this.reference = this.db.collection(this.getFullPath());
        }
        else {
            throw Error('DB reference does not exist or a path is being provided.');
        }
    }
    getFullPath() {
        return this.id;
    }
    async createDocument(data) {
        if (this.reference != null && CollectionReference_1.isCollectionReference(this.reference)) {
            const id = uuid_1.v4();
            await this.reference.doc(id).set(data.toJS(), { merge: true });
            let document;
            if (IDEnabled_1.isIDEnabled(data) && data.has('id')) {
                document = data.set('id', id);
                return new Document_1.Document(document, this.getFullPath(), this.collections);
            }
            else {
                throw Error('You must an id property to your data object.');
            }
        }
        else {
            throw Error('No reference set');
        }
    }
    async updateDocument(data) {
        if (this.reference != null && CollectionReference_1.isCollectionReference(this.reference)) {
            if (IDEnabled_1.isIDEnabled(data)) {
                await this.reference.doc(data.id).update(data.toJS());
                return new Document_1.Document(data, this.getFullPath(), this.collections);
            }
            else {
                throw Error('You must an id property to your data object.');
            }
        }
        else {
            throw Error('No reference set');
        }
    }
    async deleteDocument(id) {
        if (this.reference != null && CollectionReference_1.isCollectionReference(this.reference)) {
            await this.reference.doc(id).delete();
        }
    }
    subscribeToDocument(id, makeRecord, onDataChange, onError) {
        if (this.reference != null && CollectionReference_1.isCollectionReference(this.reference)) {
            this.reference.doc(id).onSnapshot((snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    const record = makeRecord(data);
                    const document = new Document_1.Document(record, this.getFullPath(), this.collections);
                    onDataChange(document);
                }
            }, (error) => {
                onError(error);
            });
        }
    }
}
exports.Collection = Collection;
