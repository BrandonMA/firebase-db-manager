"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createTimestamp = void 0;
var app_1 = __importDefault(require("firebase/compat/app"));
require("firebase/compat/firestore");
function createTimestamp(date) {
    return date != null ? app_1["default"].firestore.Timestamp.fromDate(date) : app_1["default"].firestore.Timestamp.now();
}
exports.createTimestamp = createTimestamp;
//# sourceMappingURL=createTimestamp.js.map