import { Database, Collection, SubCollection, IDEnabled, createTimestamp, Timestamp } from './src';
import { firebaseConfig } from './firebase';
import firebase from 'firebase/compat/app';

// Firebase setup

firebase.initializeApp(firebaseConfig);

// Types

interface User extends IDEnabled {
    name: string;
}

interface Conversation extends IDEnabled {
    name: string;
    creationDate: Timestamp;
}

type UsersSubCollections = {
    conversations: SubCollection<Conversation, null>;
};

const database = new Database({
    users: new Collection<User, UsersSubCollections>('Users', {
        conversations: new SubCollection('conversations', null)
    })
});

// Code example

async function main(): Promise<void> {
    const firstUser = await database.collections.users.createDocument({
        name: 'Brandon',
        id: '1'
    });

    const secondUser = await database.collections.users.createDocument({
        name: 'Example User',
        id: '2'
    });

    // Create data

    await firstUser.collections.conversations.createDocument({
        id: 'brandon-conversation-1',
        name: 'Conversation 1 for brandon',
        creationDate: createTimestamp()
    });

    await firstUser.collections.conversations.createDocument({
        id: 'brandon-conversation-2',
        name: 'Conversation 2 for brandon',
        creationDate: createTimestamp()
    });

    await secondUser.collections.conversations.createDocument({
        id: 'example-conversation-1',
        name: 'Conversation 1 for example',
        creationDate: createTimestamp()
    });

    // Query data

    const firstUserResults = await firstUser.collections.conversations.getDocuments({
        property: 'creationDate',
        direction: 'desc'
    });

    console.log(firstUserResults.length);

    const secondUserResults = await secondUser.collections.conversations.getDocuments({
        property: 'creationDate',
        direction: 'desc'
    });

    console.log(secondUserResults.length);

    console.log(firstUserResults.length === secondUserResults.length);
}

main();
