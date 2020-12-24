"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createGeoPoint = void 0;
var app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
function createGeoPoint(latitude, longitude) {
    return new app_1["default"].firestore.GeoPoint(latitude, longitude);
}
exports.createGeoPoint = createGeoPoint;
//# sourceMappingURL=createGeoPoint.js.map