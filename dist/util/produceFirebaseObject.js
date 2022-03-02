"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.produceFirebaseObjectt = void 0;
var immer_1 = __importDefault(require("immer"));
var assignPropertiesToObject_1 = require("./assignPropertiesToObject");
function produceFirebaseObjectt(newObject, oldObject, assignNullable, callback) {
    if (assignNullable === void 0) { assignNullable = false; }
    return immer_1["default"](oldObject, function (draft) {
        callback(draft);
        return assignPropertiesToObject_1.assignPropertiesToObject(draft, newObject, assignNullable);
    });
}
exports.produceFirebaseObjectt = produceFirebaseObjectt;
//# sourceMappingURL=produceFirebaseObject.js.map