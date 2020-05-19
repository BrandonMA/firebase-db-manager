import * as firebase from 'firebase/app';

export interface DatabaseReferenceHolder {
    db: firebase.firestore.Firestore | null;
}

export function isDatabaseReferenceHolder(value: unknown): value is DatabaseReferenceHolder {
    const casted = value as DatabaseReferenceHolder;
    return casted.db !== undefined;
}
