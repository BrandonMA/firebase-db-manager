import * as firebase from 'firebase/app';
export interface SortingPredicate {
    property: string;
    direction: firebase.firestore.OrderByDirection;
}
