import shareDatabaseReference from './shareDatabaseReference';
var Database = /** @class */ (function () {
    function Database(collections) {
        shareDatabaseReference(collections);
        this.collections = collections;
    }
    return Database;
}());
export { Database };
//# sourceMappingURL=Database.js.map