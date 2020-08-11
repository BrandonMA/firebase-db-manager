import { Timestamp } from './Timestamp';
import { GeoPoint } from './GeoPoint';
import { FirebaseReference } from './FirebaseReference';
export declare type PropertyTypes = string | number | boolean | Array<any> | Timestamp | GeoPoint | FirebaseReference | null;
export interface DocumentData {
    [key: string]: PropertyTypes | DocumentData;
}
