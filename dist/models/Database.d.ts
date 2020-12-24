import { immerable } from 'immer';
export declare class Database<Collections> {
    collections: Collections;
    [immerable]: boolean;
    constructor(collections: Collections);
}
