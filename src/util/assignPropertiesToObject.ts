export function assignPropertiesToObject<T>(newObject: T, oldObject: T, assignNullable = false): void {
    Object.keys(newObject).forEach(function (key) {
        const propertyName = key as keyof T;
        const oldValue = oldObject[propertyName];
        if (oldValue != null || assignNullable) {
            newObject[propertyName] = oldValue;
        }
    });
}
