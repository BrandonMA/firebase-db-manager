"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.produceFirebaseObject = void 0;
var immer_1 = __importDefault(require("immer"));
var assignPropertiesToObject_1 = require("./assignPropertiesToObject");
function produceFirebaseObject(originalObject, dataToAssign, assignNullable, callback) {
    return (0, immer_1["default"])(originalObject, function (draft) {
        callback === null || callback === void 0 ? void 0 : callback(draft);
        return (0, assignPropertiesToObject_1.assignPropertiesToObject)(draft, dataToAssign, assignNullable);
    });
}
exports.produceFirebaseObject = produceFirebaseObject;
//# sourceMappingURL=produceFirebaseObject.js.map