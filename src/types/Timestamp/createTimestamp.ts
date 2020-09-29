import { Timestamp } from './Timestamp';
import firebase from 'firebase/app';
import 'firebase/firestore';

export function createTimestamp(date?: Date): Timestamp {
    return date != null ? firebase.firestore.Timestamp.fromDate(date) : firebase.firestore.Timestamp.now();
}
