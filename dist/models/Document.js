"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
exports.Document = void 0;
var immer_1 = require("immer");
var shareDatabaseReference_1 = __importDefault(require("./shareDatabaseReference"));
var Document = /** @class */ (function () {
    function Document(data, reference, subCollections) {
        this[_a] = true;
        this.data = data;
        if (reference != null && subCollections != null) {
            this.collections = shareDatabaseReference_1["default"](subCollections, reference);
        }
    }
    Document.prototype.id = function () {
        return this.data.id;
    };
    return Document;
}());
exports.Document = Document;
_a = immer_1.immerable;
//# sourceMappingURL=Document.js.map