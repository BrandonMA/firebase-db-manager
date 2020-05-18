import { FirebaseReference } from './FirebaseReference';
export interface CollectionData {
    reference: FirebaseReference | null;
    setReference: (previousPath: string | null) => void;
}
export declare function isCollectionData(value: unknown): value is CollectionData;
