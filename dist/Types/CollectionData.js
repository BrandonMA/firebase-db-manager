"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCollectionData = void 0;
function isCollectionData(value) {
    const casted = value;
    return casted.setReference !== undefined;
}
exports.isCollectionData = isCollectionData;
