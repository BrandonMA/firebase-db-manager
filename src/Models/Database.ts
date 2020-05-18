import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { CollectionHolder } from '../Types/CollectionHolder';
import { DatabaseReferenceHolder, isDatabaseReferenceHolder } from '../Types/DatabaseReferenceHolder';
import { isCollectionData } from '../Types/CollectionData';

export class Database<Collections> implements CollectionHolder<Collections>, DatabaseReferenceHolder {
    db: firebase.firestore.Firestore;
    collections: Collections;

    constructor(collections: Collections) {
        this.db = firebase.firestore();
        this.shareDatabaseReference(collections);
        this.collections = collections;
    }

    shareDatabaseReference<T>(collections: T) {
        for (let collection in collections) {
            if (isDatabaseReferenceHolder(collection) && isCollectionData(collection)) {
                collection.db = this.db;
                collection.setReference(null);
            }
        }
    }
}
