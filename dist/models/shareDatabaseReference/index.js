"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var firebase = __importStar(require("firebase/app"));
require("firebase/firestore");
var CollectionData_1 = require("../../types/CollectionData");
function shareDatabaseReference(collections, reference) {
    var newEntries = Object.entries(collections).map(function (entry) {
        var key = entry[0], collection = entry[1];
        if (CollectionData_1.isReferenceHolder(collection)) {
            var finalReference = reference !== null && reference !== void 0 ? reference : firebase.firestore();
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