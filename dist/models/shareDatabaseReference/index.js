import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { isReferenceHolder } from '../../types/CollectionData';
export default function shareDatabaseReference(collections, reference) {
    const newEntries = Object.entries(collections).map((entry) => {
        const [key, collection] = entry;
        if (isReferenceHolder(collection)) {
            const finalReference = reference !== null && reference !== void 0 ? reference : firebase.firestore();
            const newCollection = collection.setReference(finalReference.collection(collection.id));
            return [key, newCollection];
        }
        return [key, collection];
    });
    return Object.fromEntries(newEntries);
}
//# sourceMappingURL=index.js.map