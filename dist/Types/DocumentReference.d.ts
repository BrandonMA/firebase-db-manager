import * as firebase from 'firebase/app';
export declare type DocumentReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export declare function isDocumentReference(value: unknown): value is DocumentReference;
