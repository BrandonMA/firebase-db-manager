import { DataHolder } from '../Types/DataHolder';
import { isCollectionData } from '../Types/CollectionData';
import { isIDEnabled } from '../Types/IDEnabled';
import { Record } from 'immutable';

interface DocumentData {
    previousPath: string;
}

const DocumentRecord = Record<DocumentData>({
    previousPath: ''
});

export class Document<DataType, SubCollections> extends DocumentRecord {
    private collections: SubCollections | null;
    data: DataHolder<DataType>;

    constructor(data: DataHolder<DataType>, previousPath: string, subCollections: SubCollections | null) {
        super({ previousPath });
        this.data = data;
        this.collections = Object.freeze(subCollections);

        for (const subCollection in subCollections) {
            if (isCollectionData(subCollection) && isIDEnabled(data)) {
                subCollection.setReference(this.previousPath);
            }
        }
    }

    id(): string {
        if (isIDEnabled(this.data)) {
            return this.data.id;
        } else {
            throw Error('Data holder must have an id');
        }
    }

    subCollections(): SubCollections | null {
        return this.collections;
    }
}
