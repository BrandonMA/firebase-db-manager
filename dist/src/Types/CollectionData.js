export function isCollectionData(value) {
    const casted = value;
    return casted.setReference !== undefined;
}
