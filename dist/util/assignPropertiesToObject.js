export function assignPropertiesToObject(draft, dataToAssign, assignNullable = false) {
    Object.keys(draft).forEach((key) => {
        const propertyName = key;
        const value = dataToAssign[propertyName];
        if (value != null || assignNullable) {
            draft[propertyName] = value;
        }
    });
}
//# sourceMappingURL=assignPropertiesToObject.js.map