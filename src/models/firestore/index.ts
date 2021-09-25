import firebase from 'firebase/app';
import 'firebase/firestore';

export default function firestore(): ReturnType<typeof firebase.firestore> {
    return firebase.firestore();
}
