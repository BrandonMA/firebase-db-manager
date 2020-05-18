"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDocumentReference = void 0;
require("firebase/firestore");
function isDocumentReference(value) {
    const casted = value;
    return casted.collection !== undefined;
}
exports.isDocumentReference = isDocumentReference;
