"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
var CollectionData_1 = require("../../types/CollectionData");
function shareDatabaseReference(collections, reference) {
    var newEntries = Object.entries(collections).map(function (entry) {
        var key = entry[0], collection = entry[1];
        if (CollectionData_1.isReferenceHolder(collection)) {
            var finalReference = reference !== null && reference !== void 0 ? reference : app_1["default"].firestore();
            var newCollection = collection.setReference(finalReference.collection(collection.id));
            return [key, newCollection];
        }
        else {
            return [key, collection];
        }
    });
    return Object.fromEntries(newEntries);
}
exports["default"] = shareDatabaseReference;
//# sourceMappingURL=index.js.map