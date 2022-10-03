var _a;
import { immerable } from 'immer';
import shareDatabaseReference from './shareDatabaseReference';
export class Database {
    constructor(collections) {
        this[_a] = true;
        this.collections = shareDatabaseReference(collections);
    }
}
_a = immerable;
//# sourceMappingURL=Database.js.map