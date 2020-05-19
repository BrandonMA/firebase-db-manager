import { IDEnabled } from '../Types/IDEnabled';
import { CollectionHolder } from '../Types/CollectionHolder';
import { DatabaseReferenceHolder } from '../Types/DatabaseReferenceHolder';
import { CollectionData } from '../Types/CollectionData';
import { FirebaseReference } from '../Types/FirebaseReference';
import { isCollectionReference } from '../Types/CollectionReference';
import { v4 as uuidv4 } from 'uuid';
import { Document } from './Document';
import shareDatabaseReference from './shareDatabaseReference';
import produce from 'immer';

export class Collection<DataType extends IDEnabled, SubCollections>
    implements IDEnabled, CollectionHolder<SubCollections>, DatabaseReferenceHolder, CollectionData {
    id: string;
    db: firebase.firestore.Firestore | null;
    reference: FirebaseReference | null;
    collections: SubCollections | null;

    constructor(id: string, subCollections: SubCollections | null) {
        this.id = id;
        this.db = null;
        this.reference = null;
        this.collections = subCollections;
    }

    setReference(previousPath: string | null): void {
        if (this.db != null && previousPath == null) {
            this.reference = this.db.collection(this.getFullPath());
            shareDatabaseReference(this.collections, this.db);
        } else {
            throw Error('DB reference does not exist or a path is being provided.');
        }
    }

    getFullPath(): string {
        return this.id;
    }

    async createDocument(data: DataType): Promise<Document<DataType, SubCollections>> {
        if (this.reference != null && isCollectionReference(this.reference)) {
            const id = uuidv4();
            const newData = produce(data, (draft) => {
                draft.id = id;
            });
            await this.reference.doc(id).set(newData, { merge: true });
            return new Document(newData, this.getFullPath(), this.collections);
        } else {
            throw Error('No reference set');
        }
    }

    async updateDocument(data: DataType): Promise<Document<DataType, SubCollections>> {
        if (this.reference != null && isCollectionReference(this.reference)) {
            await this.reference.doc(data.id).update(data);
            return new Document(data, this.getFullPath(), this.collections);
        } else {
            throw Error('No reference set');
        }
    }

    async deleteDocument(id: string): Promise<void> {
        if (this.reference != null && isCollectionReference(this.reference)) {
            await this.reference.doc(id).delete();
        }
    }

    subscribeToDocument(
        id: string,
        onDataChange: (document: Document<DataType, SubCollections>) => void,
        onError: (error: Error) => void
    ): void {
        if (this.reference != null && isCollectionReference(this.reference)) {
            this.reference.doc(id).onSnapshot(
                (snapshot) => {
                    if (snapshot.exists) {
                        const data = snapshot.data() as DataType;
                        const document = new Document(data, this.getFullPath(), this.collections);
                        onDataChange(document);
                    }
                },
                (error) => {
                    onError(error);
                }
            );
        }
    }
}
