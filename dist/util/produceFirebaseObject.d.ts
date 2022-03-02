import { Draft } from 'immer';
export declare function produceFirebaseObjectt<T>(newObject: T, oldObject: T, assignNullable: boolean | undefined, callback: (draft: Draft<T>) => void): T;
