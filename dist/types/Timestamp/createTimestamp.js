import firebase from 'firebase/app';
import 'firebase/firestore';
export function createTimestamp() {
    return firebase.firestore.Timestamp.now();
}
//# sourceMappingURL=createTimestamp.js.map