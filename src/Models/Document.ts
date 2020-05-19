import { isCollectionData } from '../Types/CollectionData';
import { IDEnabled } from '../Types/IDEnabled';
import { CollectionHolder } from '../Types/CollectionHolder';
import produce from 'immer';

export class Document<DataType extends IDEnabled, SubCollections> implements CollectionHolder<SubCollections> {
    collections: SubCollections;
    data: Readonly<DataType>;
    previousPath: string;

    constructor(data: DataType, previousPath: string, subCollections: SubCollections) {
        this.previousPath = previousPath;
        this.data = data;
        this.collections = subCollections;
        this.setReferenceToSubCollections();
    }

    setReferenceToSubCollections(): void {
        if (this.collections != null) {
            const values = Object.values(this.collections);
            values.forEach((subCollection) => {
                if (isCollectionData(subCollection)) {
                    subCollection.setReference(`${this.previousPath}/${this.id()}`);
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
