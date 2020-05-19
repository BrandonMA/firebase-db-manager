import * as firebase from 'firebase/app';
import { SubCollection, Collection, Database, IDEnabled } from '../src';
import firebaseConfig from './firebase';

interface User extends IDEnabled {
    name: string;
    email: string;
}

interface Pet extends IDEnabled {
    name: string;
}

firebase.initializeApp(firebaseConfig);

const userSubCollections = {
    pets: new SubCollection<Pet, null>('Pets', null)
};
const usersCollection = new Collection<User, typeof userSubCollections>('Users', userSubCollections);
const collections = {
    users: usersCollection
};
const database = new Database(collections);

async function tryExample(): Promise<void> {
    let brandon = await database.collections.users.createDocument({
        id: '',
        name: 'Brandon',
        email: 'brandonma98@protonmail.com'
    });
    console.log(`The user ${brandon.data.name} has been created, his email is ${brandon.data.email}`);

    const dog = await brandon.collections.pets.createDocument({
        id: '1',
        name: 'Dog'
    });
    console.log(`${brandon.data.name} created a pet called ${dog.data.name}`);

    const updatedDataForBrandon = brandon.modifyData({ email: 'maldonado.brandon177@gmail.com ' });
    brandon = await database.collections.users.updateDocument(updatedDataForBrandon);
    console.log(`The user ${brandon.data.name} updated his email to ${brandon.data.email}`);
}

tryExample();
