import firebase from 'firebase/app';
import 'firebase/storage';

export async function uploadFile(path: string, filePath: string): Promise<string> {
    const reference = firebase.storage().ref(path);
    const response = await fetch(filePath);
    const blob = await response.blob();
    await reference.put(blob);
    return reference.getDownloadURL();
}
