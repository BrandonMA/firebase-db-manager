import 'firebase/firestore';
export function isDatabaseReferenceHolder(value) {
    var casted = value;
    return casted.db !== undefined;
}
//# sourceMappingURL=DatabaseReferenceHolder.js.map