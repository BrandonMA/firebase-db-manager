import { isCollectionData } from '../../types/reserved/CollectionData';
import firestore from '@react-native-firebase/firestore';

export default function shareDatabaseReference<Collections>(collections: Collections): void {
    const values = Object.values(collections);
    values.forEach((collection) => {
        if (isCollectionData(collection)) {
            collection.setReference(firestore().collection(collection.id));
        }
    });
}
