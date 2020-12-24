"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createTimestamp = void 0;
var firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
function createTimestamp(date) {
    return date != null ? firestore_1["default"].Timestamp.fromDate(date) : firestore_1["default"].Timestamp.now();
}
exports.createTimestamp = createTimestamp;
//# sourceMappingURL=createTimestamp.native.js.map