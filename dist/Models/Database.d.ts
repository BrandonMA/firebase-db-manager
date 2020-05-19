import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { CollectionHolder } from '../Types/CollectionHolder';
import { DatabaseReferenceHolder } from '../Types/DatabaseReferenceHolder';
export declare class Database<Collections> implements CollectionHolder<Collections>, DatabaseReferenceHolder {
    db: firebase.firestore.Firestore;
    collections: Collections;
    constructor(collections: Collections);
}
