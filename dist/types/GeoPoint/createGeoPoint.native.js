import firestore from '@react-native-firebase/firestore';
export function createGeoPoint(latitude, longitude) {
    return new firestore.GeoPoint(latitude, longitude);
}
//# sourceMappingURL=createGeoPoint.native.js.map