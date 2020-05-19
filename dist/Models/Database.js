import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { isDatabaseReferenceHolder } from '../Types/DatabaseReferenceHolder';
import { isCollectionData } from '../Types/CollectionData';
var Database = /** @class */ (function () {
    function Database(collections) {
        this.db = firebase.firestore();
        this.shareDatabaseReference(collections);
        this.collections = collections;
    }
    Database.prototype.shareDatabaseReference = function (collections) {
        for (var collection in collections) {
            if (isDatabaseReferenceHolder(collection) && isCollectionData(collection)) {
                collection.db = this.db;
                collection.setReference(null);
            }
        }
    };
    return Database;
}());
export { Database };
//# sourceMappingURL=Database.js.map