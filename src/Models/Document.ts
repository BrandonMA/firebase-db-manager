import { CollectionHolder } from '../Types/CollectionHolder';
import { DataHolder } from '../Types/DataHolder';
import { isCollectionData } from '../Types/CollectionData';
import { isIDEnabled } from '../Types/IDEnabled';

export class Document<DataType, SubCollections> implements CollectionHolder<SubCollections> {
    collections: SubCollections | null;
    data: DataHolder<DataType>;
    previousPath: string;

    constructor(data: DataHolder<DataType>, previousPath: string, subCollections: SubCollections | null) {
        this.data = data;
        this.collections = subCollections;
        this.previousPath = previousPath;

        for (let subCollection in subCollections) {
            if (isCollectionData(subCollection) && isIDEnabled(data)) {
                subCollection.setReference(this.previousPath);
            }
        }
    }
}
