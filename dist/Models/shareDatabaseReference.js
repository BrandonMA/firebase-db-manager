import { isDatabaseReferenceHolder } from './ReservedTypes/DatabaseReferenceHolder';
import { isCollectionData } from './ReservedTypes/CollectionData';
export default function shareDatabaseReference(collections, db) {
    var values = Object.values(collections);
    values.forEach(function (collection) {
        if (isDatabaseReferenceHolder(collection) && isCollectionData(collection)) {
            collection.db = db;
            collection.setReference(db.collection(collection.id));
        }
    });
}
//# sourceMappingURL=shareDatabaseReference.js.map