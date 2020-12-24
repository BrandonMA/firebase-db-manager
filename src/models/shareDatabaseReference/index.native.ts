import { isReferenceHolder } from '../../types/CollectionData';
import firestore from '@react-native-firebase/firestore';
import { DocumentReference } from '../../types';

export default function shareDatabaseReference<Collections>(
    collections: Collections,
    reference?: DocumentReference | ReturnType<typeof firestore>
): Collections {
    const newEntries = Object.entries(collections).map((entry): [string, unknown] => {
        const [key, collection] = entry;
        if (isReferenceHolder(collection)) {
            const finalReference = reference ?? firestore();
            const newCollection = collection.setReference(finalReference.collection(collection.id));
            return [key, newCollection];
        } else {
            return [key, collection];
        }
    });
    return (Object.fromEntries(newEntries) as unknown) as Collections;
}
