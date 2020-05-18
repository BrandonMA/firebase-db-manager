import * as firebase from 'firebase/app';
import 'firebase/firestore';
export interface DatabaseReferenceHolder {
    db: firebase.firestore.Firestore | null;
}
export declare function isDatabaseReferenceHolder(value: unknown): value is DatabaseReferenceHolder;
