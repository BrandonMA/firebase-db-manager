import { Timestamp } from './Timestamp';
import firestore from '@react-native-firebase/firestore';

export function createTimestamp(): Timestamp {
    return firestore.Timestamp.now();
}
