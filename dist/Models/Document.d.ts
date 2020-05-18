import { DataHolder } from '../Types/DataHolder';
import { Record } from 'immutable';
interface DocumentData {
    previousPath: string;
}
declare const DocumentRecord: Record.Factory<DocumentData>;
export declare class Document<DataType, SubCollections> extends DocumentRecord {
    private collections;
    data: DataHolder<DataType>;
    constructor(data: DataHolder<DataType>, previousPath: string, subCollections: SubCollections | null);
    id(): string;
    subCollections(): SubCollections | null;
}
export {};
