import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { CollectionReference } from '../../types';
import { isCollectionData } from '../../types/reserved/CollectionData';

export default function shareDatabaseReference<Collections>(collections: Collections): void {
    const values = Object.values(collections);
    values.forEach((collection) => {
        if (isCollectionData(collection)) {
            collection.setReference((firebase.firestore().collection(collection.id) as unknown) as CollectionReference);
        }
    });
}
