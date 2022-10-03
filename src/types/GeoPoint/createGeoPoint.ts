import { GeoPoint } from './GeoPoint';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export function createGeoPoint(latitude: number, longitude: number): GeoPoint {
    return new firebase.firestore.GeoPoint(latitude, longitude);
}
