import 'firebase/firestore';
export function isDatabaseReferenceHolder(value) {
    const casted = value;
    return casted.db !== undefined;
}
