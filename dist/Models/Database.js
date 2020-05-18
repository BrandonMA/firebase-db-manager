"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const firebase = require("firebase/app");
require("firebase/firestore");
const DatabaseReferenceHolder_1 = require("../Types/DatabaseReferenceHolder");
const CollectionData_1 = require("../Types/CollectionData");
class Database {
    constructor(collections) {
        this.db = firebase.firestore();
        this.shareDatabaseReference(collections);
        this.collections = collections;
    }
    shareDatabaseReference(collections) {
        for (const collection in collections) {
            if (DatabaseReferenceHolder_1.isDatabaseReferenceHolder(collection) && CollectionData_1.isCollectionData(collection)) {
                collection.db = this.db;
                collection.setReference(null);
            }
        }
    }
}
exports.Database = Database;
