import { Collection } from './Collection';
import { isDocumentReference } from '../Types/DocumentReference';
import { isCollectionReference } from '../Types/CollectionReference';
export class SubCollection extends Collection {
    constructor(id, subCollections) {
        super(id, subCollections);
        this.reference = null;
        this.previousPath = null;
    }
    setReference(previousPath) {
        this.previousPath = previousPath;
        const components = this.getFullPath().split('/');
        let reference = null;
        components.forEach((value, index) => {
            if (this.db != null) {
                if (index === 0) {
                    reference = this.db.collection(value);
                }
                else if (index % 2 === 0 && isDocumentReference(reference)) {
                    reference = reference.collection(value);
                }
                else if (isCollectionReference(reference)) {
                    reference = reference.doc(value);
                }
            }
        });
        this.reference = reference;
    }
    getFullPath() {
        return `${this.previousPath}/${this.id}`;
    }
}
