import 'firebase/firestore';
export function isCollectionReference(value) {
    const casted = value;
    return casted.doc !== undefined;
}
