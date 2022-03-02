"use strict";
exports.__esModule = true;
exports.assignPropertiesToObject = void 0;
function assignPropertiesToObject(newObject, oldObject, assignNullable) {
    if (assignNullable === void 0) { assignNullable = false; }
    Object.keys(newObject).forEach(function (key) {
        var propertyName = key;
        var oldValue = oldObject[propertyName];
        if (oldValue != null || assignNullable) {
            newObject[propertyName] = oldValue;
        }
    });
}
exports.assignPropertiesToObject = assignPropertiesToObject;
//# sourceMappingURL=assignPropertiesToObject.js.map