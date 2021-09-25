"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("firebase/app"));
require("firebase/functions");
function batch() {
    return app_1["default"].functions();
}
exports["default"] = batch;
//# sourceMappingURL=index.js.map