import * as firebase from 'firebase/app';
import 'firebase/firestore';
import shareDatabaseReference from './shareDatabaseReference';
var Database = /** @class */ (function () {
    function Database(collections) {
        this.db = firebase.firestore();
        shareDatabaseReference(collections, this.db);
        this.collections = collections;
    }
    return Database;
}());
export { Database };
//# sourceMappingURL=Database.js.map