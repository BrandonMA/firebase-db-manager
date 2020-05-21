import * as firebase from 'firebase/app';
import { PropertyTypes } from './DocumentTypes';

export interface FilterPredicate {
    property: string;
    direction: firebase.firestore.WhereFilterOp;
    value: PropertyTypes;
}
