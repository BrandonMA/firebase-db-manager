import * as firebase from 'firebase/app';
import 'firebase/firestore';

export type CollectionReference = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

export function isCollectionReference(value: unknown): value is CollectionReference {
    const casted = value as CollectionReference;
    return casted.doc !== undefined;
}
