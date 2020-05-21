import { CollectionReference, IDEnabled } from '../../Types';

export interface CollectionData extends IDEnabled {
    reference: CollectionReference | null;
    setReference: (reference: CollectionReference) => void;
}

export function isCollectionData(value: unknown): value is CollectionData {
    const casted = value as CollectionData;
    return casted.setReference !== undefined;
}
