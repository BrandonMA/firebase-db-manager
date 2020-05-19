import { isCollectionData } from '../Types/CollectionData';
import produce from 'immer';
var Document = /** @class */ (function () {
    function Document(data, previousPath, subCollections) {
        this.previousPath = previousPath;
        this.data = data;
        this.collections = subCollections;
        this.setReferenceToSubCollections();
    }
    Document.prototype.setReferenceToSubCollections = function () {
        var _this = this;
        if (this.collections != null) {
            var values = Object.values(this.collections);
            values.forEach(function (subCollection) {
                if (isCollectionData(subCollection)) {
                    subCollection.setReference(_this.previousPath + "/" + _this.id());
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
//# sourceMappingURL=Document.js.map