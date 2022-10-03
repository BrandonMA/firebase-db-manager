import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
export function createGeoPoint(latitude, longitude) {
    return new firebase.firestore.GeoPoint(latitude, longitude);
}
//# sourceMappingURL=createGeoPoint.js.map