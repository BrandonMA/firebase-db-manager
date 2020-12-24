import firestore from '@react-native-firebase/firestore';
import { DocumentReference } from '../../types';
export default function shareDatabaseReference<Collections>(collections: Collections, reference?: DocumentReference | ReturnType<typeof firestore>): Collections;
