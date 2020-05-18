import 'firebase/firestore';
export function isDocumentReference(value) {
    const casted = value;
    return casted.collection !== undefined;
}
