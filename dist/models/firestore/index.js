"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
function firestore() {
    return app_1["default"].firestore();
}
exports["default"] = firestore;
//# sourceMappingURL=index.js.map