import { isCollectionData } from '../../types/reserved/CollectionData';
import firestore from '@react-native-firebase/firestore';
export default function shareDatabaseReference(collections) {
    var values = Object.values(collections);
    values.forEach(function (collection) {
        if (isCollectionData(collection)) {
            collection.setReference(firestore().collection(collection.id));
        }
    });
}
//# sourceMappingURL=index.native.js.map