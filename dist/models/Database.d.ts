import { immerable } from 'immer';
export declare class Database<Collections extends object> {
    collections: Collections;
    [immerable]: boolean;
    constructor(collections: Collections);
}
