import { IDEnabled } from '../Types/IDEnabled';
import { CollectionHolder } from '../Types/CollectionHolder';
import { DatabaseReferenceHolder } from '../Types/DatabaseReferenceHolder';
import { CollectionData } from '../Types/CollectionData';
import { FirebaseReference } from '../Types/FirebaseReference';
import { Document } from './Document';
export declare class Collection<DataType extends IDEnabled, SubCollections> implements IDEnabled, CollectionHolder<SubCollections>, DatabaseReferenceHolder, CollectionData {
    id: string;
    db: firebase.firestore.Firestore | null;
    reference: FirebaseReference | null;
    collections: SubCollections | null;
    constructor(id: string, subCollections: SubCollections | null);
    setReference(previousPath: string | null): void;
    getFullPath(): string;
    createDocument(data: DataType): Promise<Document<DataType, SubCollections>>;
    updateDocument(data: DataType): Promise<Document<DataType, SubCollections>>;
    deleteDocument(id: string): Promise<void>;
    subscribeToDocument(id: string, onDataChange: (document: Document<DataType, SubCollections>) => void, onError: (error: Error) => void): void;
}
