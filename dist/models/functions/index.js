"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("firebase/compat/app"));
require("firebase/compat/functions");
function functions() {
    return app_1["default"].functions();
}
exports["default"] = functions;
//# sourceMappingURL=index.js.map