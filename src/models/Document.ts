import produce, { immerable } from 'immer';
import { DocumentReference, IDEnabled } from '../types';
import { isCollectionData } from '../types/reserved/CollectionData';
import { CollectionHolder } from '../types/reserved/CollectionHolder';

export class Document<DataType extends IDEnabled, SubCollections> implements CollectionHolder<SubCollections> {
    collections: SubCollections;
    data: Readonly<DataType>;
    reference: DocumentReference;
    [immerable] = true;

    constructor(data: DataType, reference?: DocumentReference, subCollections?: SubCollections) {
        this.data = data;
        if (reference != null && subCollections != null) {
            this.reference = reference;
            this.collections = subCollections;
            this.setReferenceToSubCollections();
        }
    }

    setReferenceToSubCollections(): void {
        if (this.collections != null) {
            const values = Object.values(this.collections);
            values.forEach((subCollection) => {
                if (isCollectionData(subCollection)) {
                    subCollection.setReference(this.reference.collection(subCollection.id));
                }
            });
        }
    }

    id(): string {
        return this.data.id;
    }

    modifyData(newData: Partial<DataType>): DataType {
        return produce(this.data, (draft) => {
            Object.assign(draft, newData);
        });
    }
}
