"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCollectionReference = void 0;
require("firebase/firestore");
function isCollectionReference(value) {
    const casted = value;
    return casted.doc !== undefined;
}
exports.isCollectionReference = isCollectionReference;
