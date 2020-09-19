import { GeoPoint } from './GeoPoint';
import firebase from 'firebase/app';
import 'firebase/firestore';

export function createGeoPoint(latitude: number, longitude: number): GeoPoint {
    return new firebase.firestore.GeoPoint(latitude, longitude);
}
