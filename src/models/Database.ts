import { CollectionHolder } from '../types/reserved/CollectionHolder';
import shareDatabaseReference from './shareDatabaseReference';

export class Database<Collections> implements CollectionHolder<Collections> {
    collections: Collections;

    constructor(collections: Collections) {
        shareDatabaseReference(collections);
        this.collections = collections;
    }
}
