import { Draft } from 'immer';
export declare function produceFirebaseObject<T>(originalObject: T, dataToAssign: Partial<T>, assignNullable?: boolean, callback?: (draft: Draft<T>) => void): T;
