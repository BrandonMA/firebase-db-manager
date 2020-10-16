var _a;
import produce, { immerable } from 'immer';
import { isCollectionData } from '../types/reserved/CollectionData';
var Document = /** @class */ (function () {
    function Document(data, reference, subCollections) {
        this[_a] = true;
        this.data = data;
        if (reference != null && subCollections != null) {
            this.reference = reference;
            this.collections = subCollections;
            this.setReferenceToSubCollections();
        }
    }
    Document.prototype.setReferenceToSubCollections = function () {
        var _this = this;
        if (this.collections != null) {
            var values = Object.values(this.collections);
            values.forEach(function (subCollection) {
                if (isCollectionData(subCollection)) {
                    subCollection.setReference(_this.reference.collection(subCollection.id));
                }
            });
        }
    };
    Document.prototype.id = function () {
        return this.data.id;
    };
    Document.prototype.modifyData = function (newData) {
        return produce(this.data, function (draft) {
            Object.assign(draft, newData);
        });
    };
    return Document;
}());
export { Document };
_a = immerable;
//# sourceMappingURL=Document.js.map