"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDatabaseReferenceHolder = void 0;
require("firebase/firestore");
function isDatabaseReferenceHolder(value) {
    const casted = value;
    return casted.db !== undefined;
}
exports.isDatabaseReferenceHolder = isDatabaseReferenceHolder;
