import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { DocumentReference } from '../../types';
export default function shareDatabaseReference<Collections extends object>(collections: Collections, reference?: DocumentReference | firebase.firestore.Firestore): Collections;
