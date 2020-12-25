"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.SubCollection = void 0;
var Collection_1 = require("./Collection");
var SubCollection = /** @class */ (function (_super) {
    __extends(SubCollection, _super);
    function SubCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SubCollection;
}(Collection_1.Collection));
exports.SubCollection = SubCollection;
//# sourceMappingURL=SubCollection.js.map