import firebase from 'firebase/app';
import 'firebase/firestore';
export function createGeoPoint(latitude, longitude) {
    return new firebase.firestore.GeoPoint(latitude, longitude);
}
//# sourceMappingURL=createGeoPoint.js.map