import { CollectionHolder } from '../types/reserved/CollectionHolder';
export declare class Database<Collections> implements CollectionHolder<Collections> {
    collections: Collections;
    constructor(collections: Collections);
}
