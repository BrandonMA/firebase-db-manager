import * as firebase from 'firebase';
import { isDatabaseReferenceHolder } from './reservedTypes/DatabaseReferenceHolder';
import { isCollectionData } from './reservedTypes/CollectionData';

export default function shareDatabaseReference<Collections>(collections: Collections, db: firebase.firestore.Firestore): void {
    const values = Object.values(collections);
    values.forEach((collection) => {
        if (isDatabaseReferenceHolder(collection) && isCollectionData(collection)) {
            collection.db = db;
            collection.setReference(db.collection(collection.id));
        }
    });
}
