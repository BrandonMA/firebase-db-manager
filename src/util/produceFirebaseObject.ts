import produce, { Draft } from 'immer';
import { assignPropertiesToObject } from './assignPropertiesToObject';

export function produceFirebaseObject<T>(newObject: T, oldObject: T, assignNullable = false, callback: (draft: Draft<T>) => void): T {
    return produce<T>(oldObject, (draft) => {
        callback(draft);
        return assignPropertiesToObject(draft as T, newObject, assignNullable);
    });
}
