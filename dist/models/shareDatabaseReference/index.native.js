"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var CollectionData_1 = require("../../types/CollectionData");
var firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
function shareDatabaseReference(collections, reference) {
    var newEntries = Object.entries(collections).map(function (entry) {
        var key = entry[0], collection = entry[1];
        if (CollectionData_1.isReferenceHolder(collection)) {
            var finalReference = reference !== null && reference !== void 0 ? reference : firestore_1["default"]();
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
//# sourceMappingURL=index.native.js.map