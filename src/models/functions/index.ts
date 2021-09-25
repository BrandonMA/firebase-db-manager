import firebase from 'firebase/app';
import 'firebase/functions';

export default function batch(): ReturnType<typeof firebase.functions> {
    return firebase.functions();
}
