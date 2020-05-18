import { IDEnabled, isIDEnabled } from '../Types/IDEnabled';
import { CollectionHolder } from '../Types/CollectionHolder';
import { DatabaseReferenceHolder } from '../Types/DatabaseReferenceHolder';
import { CollectionData } from '../Types/CollectionData';
import { FirebaseReference } from '../Types/FirebaseReference';
import { DataHolder } from '../Types/DataHolder';
import { isCollectionReference } from '../Types/CollectionReference';
import { v4 as uuidv4 } from 'uuid';
import { Document } from './Document';

export class Collection<DataType, SubCollections>
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
        } else {
            throw Error('DB reference does not exist or a path is being provided.');
        }
    }

    getFullPath(): string {
        return this.id;
    }

    async createDocument(data: DataHolder<DataType>): Promise<Document<DataType, SubCollections>> {
        if (this.reference != null && isCollectionReference(this.reference)) {
            const id = uuidv4();
            await this.reference.doc(id).set(data.toJS(), { merge: true });
            let document;
            if (isIDEnabled(data) && data.has('id')) {
                document = ((data as unknown) as DataHolder<IDEnabled>).set('id', id);
                return new Document((document as unknown) as DataHolder<DataType>, this.getFullPath(), this.collections);
            } else {
                throw Error('You must an id property to your data object.');
            }
        } else {
            throw Error('No reference set');
        }
    }

    async updateDocument(data: DataHolder<DataType>): Promise<Document<DataType, SubCollections>> {
        if (this.reference != null && isCollectionReference(this.reference)) {
            if (isIDEnabled(data)) {
                await this.reference.doc(data.id).update(data.toJS());
                return new Document(data as DataHolder<DataType>, this.getFullPath(), this.collections);
            } else {
                throw Error('You must an id property to your data object.');
            }
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
        makeRecord: (data: DataType) => DataHolder<DataType>,
        onDataChange: (document: Document<DataType, SubCollections>) => void,
        onError: (error: Error) => void
    ): void {
        if (this.reference != null && isCollectionReference(this.reference)) {
            this.reference.doc(id).onSnapshot(
                (snapshot) => {
                    if (snapshot.exists) {
                        const data = snapshot.data() as DataType;
                        const record = makeRecord(data);
                        const document = new Document(record, this.getFullPath(), this.collections);
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
