import produce from 'immer';
import { assignPropertiesToObject } from './assignPropertiesToObject';
export function produceFirebaseObject(originalObject, dataToAssign, assignNullable, callback) {
    return produce(originalObject, (draft) => {
        callback === null || callback === void 0 ? void 0 : callback(draft);
        return assignPropertiesToObject(draft, dataToAssign, assignNullable);
    });
}
//# sourceMappingURL=produceFirebaseObject.js.map