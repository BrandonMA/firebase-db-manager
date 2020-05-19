var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Collection } from './Collection';
import { isDocumentReference } from '../Types/DocumentReference';
import { isCollectionReference } from '../Types/CollectionReference';
var SubCollection = /** @class */ (function (_super) {
    __extends(SubCollection, _super);
    function SubCollection(id, subCollections) {
        var _this = _super.call(this, id, subCollections) || this;
        _this.reference = null;
        _this.previousPath = null;
        return _this;
    }
    SubCollection.prototype.setReference = function (previousPath) {
        var _this = this;
        this.previousPath = previousPath;
        var components = this.getFullPath().split('/');
        var reference = null;
        components.forEach(function (value, index) {
            if (_this.db != null) {
                if (index === 0) {
                    reference = _this.db.collection(value);
                }
                else if (index % 2 === 0 && isDocumentReference(reference)) {
                    reference = reference.collection(value);
                }
                else if (isCollectionReference(reference)) {
                    reference = reference.doc(value);
                }
            }
        });
        this.reference = reference;
    };
    SubCollection.prototype.getFullPath = function () {
        return this.previousPath + "/" + this.id;
    };
    return SubCollection;
}(Collection));
export { SubCollection };
//# sourceMappingURL=SubCollection.js.map