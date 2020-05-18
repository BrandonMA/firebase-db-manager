import { isIDEnabled } from '../Types/IDEnabled';
import { isCollectionReference } from '../Types/CollectionReference';
import { v4 as uuidv4 } from 'uuid';
import { Document } from './Document';
export class Collection {
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
        if (this.reference != null && isCollectionReference(this.reference)) {
            const id = uuidv4();
            await this.reference.doc(id).set(data, { merge: true });
            let document;
            if (isIDEnabled(data) && data.has('id')) {
                document = data.set('id', id);
                return new Document(document, this.getFullPath(), this.collections);
            }
            else {
                throw Error('You must an id property to your data object.');
            }
        }
        else {
            throw Error('No reference set');
        }
    }
}
