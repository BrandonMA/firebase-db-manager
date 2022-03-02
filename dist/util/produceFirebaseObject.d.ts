import { Draft } from 'immer';
export declare function produceFirebaseObject<T>(newObject: T, oldObject: T, assignNullable: boolean | undefined, callback: (draft: Draft<T>) => void): T;
