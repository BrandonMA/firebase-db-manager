import * as firebase from 'firebase/app';
export declare type CollectionReference = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
export declare function isCollectionReference(value: unknown): value is CollectionReference;
