"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCollection = void 0;
const Collection_1 = require("./Collection");
const DocumentReference_1 = require("../Types/DocumentReference");
const CollectionReference_1 = require("../Types/CollectionReference");
class SubCollection extends Collection_1.Collection {
    constructor(id, subCollections) {
        super(id, subCollections);
        this.reference = null;
        this.previousPath = null;
    }
    setReference(previousPath) {
        this.previousPath = previousPath;
        const components = this.getFullPath().split('/');
        let reference = null;
        components.forEach((value, index) => {
            if (this.db != null) {
                if (index === 0) {
                    reference = this.db.collection(value);
                }
                else if (index % 2 === 0 && DocumentReference_1.isDocumentReference(reference)) {
                    reference = reference.collection(value);
                }
                else if (CollectionReference_1.isCollectionReference(reference)) {
                    reference = reference.doc(value);
                }
            }
        });
        this.reference = reference;
    }
    getFullPath() {
        return `${this.previousPath}/${this.id}`;
    }
}
exports.SubCollection = SubCollection;
