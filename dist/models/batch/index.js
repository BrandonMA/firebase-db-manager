import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
export default function batch() {
    return firebase.firestore().batch();
}
//# sourceMappingURL=index.js.map