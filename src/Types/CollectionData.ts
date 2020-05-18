import { FirebaseReference } from './FirebaseReference';

export interface CollectionData {
    reference: FirebaseReference | null;
    setReference: (previousPath: string | null) => void;
}

export function isCollectionData(value: unknown): value is CollectionData {
    const casted = value as CollectionData;
    return casted.setReference !== undefined;
}
