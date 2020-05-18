import * as firebase from 'firebase/app';
import 'firebase/firestore';

export type DocumentReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export function isDocumentReference(value: unknown): value is DocumentReference {
    const casted = value as DocumentReference;
    return casted.collection !== undefined;
}
