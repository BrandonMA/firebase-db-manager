import { CollectionReference, IDEnabled } from '.';
export interface ReferenceHolder extends IDEnabled {
    setReference: (reference: CollectionReference) => ReferenceHolder;
}
export declare function isReferenceHolder(value: unknown): value is ReferenceHolder;
