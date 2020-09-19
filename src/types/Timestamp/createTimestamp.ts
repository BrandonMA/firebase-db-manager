import { Timestamp } from './Timestamp';
import firebase from 'firebase/app';
import 'firebase/firestore';

export function createTimestamp(): Timestamp {
    return firebase.firestore.Timestamp.now();
}
