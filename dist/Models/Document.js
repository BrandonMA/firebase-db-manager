"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const CollectionData_1 = require("../Types/CollectionData");
const IDEnabled_1 = require("../Types/IDEnabled");
const immutable_1 = require("immutable");
const DocumentRecord = immutable_1.Record({
    previousPath: ''
});
class Document extends DocumentRecord {
    constructor(data, previousPath, subCollections) {
        super({ previousPath });
        this.data = data;
        this.collections = Object.freeze(subCollections);
        for (const subCollection in subCollections) {
            if (CollectionData_1.isCollectionData(subCollection) && IDEnabled_1.isIDEnabled(data)) {
                subCollection.setReference(this.previousPath);
            }
        }
    }
    id() {
        if (IDEnabled_1.isIDEnabled(this.data)) {
            return this.data.id;
        }
        else {
            throw Error('Data holder must have an id');
        }
    }
    subCollections() {
        return this.collections;
    }
}
exports.Document = Document;
