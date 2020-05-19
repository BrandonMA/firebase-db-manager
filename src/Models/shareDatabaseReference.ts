import { isDatabaseReferenceHolder, isCollectionData } from '..';
import * as firebase from 'firebase';

export default function shareDatabaseReference<Collections>(collections: Collections, db: firebase.firestore.Firestore): void {
    const values = Object.values(collections);
    values.forEach((collection) => {
        if (isDatabaseReferenceHolder(collection) && isCollectionData(collection)) {
            collection.db = db;
            collection.setReference(null);
        }
    });
}
