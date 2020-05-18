import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { isDatabaseReferenceHolder } from '../Types/DatabaseReferenceHolder';
import { isCollectionData } from '../Types/CollectionData';
export class Database {
    constructor(collections) {
        this.db = firebase.firestore();
        this.shareDatabaseReference(collections);
        this.collections = collections;
    }
    shareDatabaseReference(collections) {
        for (const collection in collections) {
            if (isDatabaseReferenceHolder(collection) && isCollectionData(collection)) {
                collection.db = this.db;
                collection.setReference(null);
            }
        }
    }
}
