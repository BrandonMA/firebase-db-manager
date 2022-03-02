"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
exports.Database = void 0;
var immer_1 = require("immer");
var shareDatabaseReference_1 = __importDefault(require("./shareDatabaseReference"));
var Database = /** @class */ (function () {
    function Database(collections) {
        this[_a] = true;
        this.collections = (0, shareDatabaseReference_1["default"])(collections);
    }
    return Database;
}());
exports.Database = Database;
_a = immer_1.immerable;
//# sourceMappingURL=Database.js.map