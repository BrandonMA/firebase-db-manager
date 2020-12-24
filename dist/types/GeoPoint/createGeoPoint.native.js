"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createGeoPoint = void 0;
var firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
function createGeoPoint(latitude, longitude) {
    return new firestore_1["default"].GeoPoint(latitude, longitude);
}
exports.createGeoPoint = createGeoPoint;
//# sourceMappingURL=createGeoPoint.native.js.map