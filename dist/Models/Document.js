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
import { isCollectionData } from '../Types/CollectionData';
import { isIDEnabled } from '../Types/IDEnabled';
import { Record } from 'immutable';
var DocumentRecord = Record({
    previousPath: ''
});
var Document = /** @class */ (function (_super) {
    __extends(Document, _super);
    function Document(data, previousPath, subCollections) {
        var _this = _super.call(this, { previousPath: previousPath }) || this;
        _this.data = data;
        _this.collections = Object.freeze(subCollections);
        for (var subCollection in subCollections) {
            if (isCollectionData(subCollection) && isIDEnabled(data)) {
                subCollection.setReference(_this.previousPath);
            }
        }
        return _this;
    }
    Document.prototype.id = function () {
        if (isIDEnabled(this.data)) {
            return this.data.id;
        }
        else {
            throw Error('Data holder must have an id');
        }
    };
    Document.prototype.subCollections = function () {
        return this.collections;
    };
    return Document;
}(DocumentRecord));
export { Document };
//# sourceMappingURL=Document.js.map