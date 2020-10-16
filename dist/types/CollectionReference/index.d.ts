import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
export declare type CollectionReference = FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;
export declare function isCollectionReference(value: unknown): value is CollectionReference;
