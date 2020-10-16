import firestore from '@react-native-firebase/firestore';
export function createTimestamp(date) {
    return date != null ? firestore.Timestamp.fromDate(date) : firestore.Timestamp.now();
}
//# sourceMappingURL=createTimestamp.native.js.map