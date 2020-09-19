import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { isCollectionData } from '../../types/reserved/CollectionData';
export default function shareDatabaseReference(collections) {
    var values = Object.values(collections);
    values.forEach(function (collection) {
        if (isCollectionData(collection)) {
            collection.setReference(firebase.firestore().collection(collection.id));
        }
    });
}
//# sourceMappingURL=index.js.map