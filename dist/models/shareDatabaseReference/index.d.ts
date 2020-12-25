import firebase from 'firebase/app';
import 'firebase/firestore';
import { DocumentReference } from '../../types';
export default function shareDatabaseReference<Collections>(collections: Collections, reference?: DocumentReference | firebase.firestore.Firestore): Collections;
