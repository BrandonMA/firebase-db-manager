import firebase from 'firebase/app';
import 'firebase/firestore';
export function createTimestamp(date) {
    return date != null ? firebase.firestore.Timestamp.fromDate(date) : firebase.firestore.Timestamp.now();
}
//# sourceMappingURL=createTimestamp.js.map