var _a;
import { immerable } from 'immer';
import shareDatabaseReference from './shareDatabaseReference';
export class Document {
    constructor(data, reference, subCollections) {
        this[_a] = true;
        this.data = data;
        if (reference != null && subCollections != null) {
            this.collections = shareDatabaseReference(subCollections, reference);
        }
    }
    id() {
        return this.data.id;
    }
}
_a = immerable;
//# sourceMappingURL=Document.js.map