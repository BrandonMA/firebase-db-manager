import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
export function createTimestamp(date) {
    return date != null ? firebase.firestore.Timestamp.fromDate(date) : firebase.firestore.Timestamp.now();
}
//# sourceMappingURL=createTimestamp.js.map