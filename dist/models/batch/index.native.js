"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
function batch() {
    return (0, firestore_1["default"])().batch();
}
exports["default"] = batch;
//# sourceMappingURL=index.native.js.map