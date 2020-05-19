import { isDatabaseReferenceHolder, isCollectionData } from '..';
export default function shareDatabaseReference(collections, db) {
    var values = Object.values(collections);
    values.forEach(function (collection) {
        if (isDatabaseReferenceHolder(collection) && isCollectionData(collection)) {
            collection.db = db;
            collection.setReference(null);
        }
    });
}
//# sourceMappingURL=shareDatabaseReference.js.map