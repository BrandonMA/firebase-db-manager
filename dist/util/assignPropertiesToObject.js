"use strict";
exports.__esModule = true;
exports.assignPropertiesToObject = void 0;
function assignPropertiesToObject(draft, dataToAssign, assignNullable) {
    if (assignNullable === void 0) { assignNullable = false; }
    Object.keys(draft).forEach(function (key) {
        var propertyName = key;
        var value = dataToAssign[propertyName];
        if (value != null || assignNullable) {
            draft[propertyName] = value;
        }
    });
}
exports.assignPropertiesToObject = assignPropertiesToObject;
//# sourceMappingURL=assignPropertiesToObject.js.map