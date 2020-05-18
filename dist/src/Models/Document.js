import { isCollectionData } from '../Types/CollectionData';
import { isIDEnabled } from '../Types/IDEnabled';
export class Document {
    constructor(data, previousPath, subCollections) {
        this.data = data;
        this.collections = subCollections;
        this.previousPath = previousPath;
        for (const subCollection in subCollections) {
            if (isCollectionData(subCollection) && isIDEnabled(data)) {
                subCollection.setReference(this.previousPath);
            }
        }
    }
}
