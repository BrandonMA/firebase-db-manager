import { Record } from 'immutable';
import { Database } from './src/Models/Database';
import { SubCollection } from './src/Models/SubCollection';
import { Collection } from './src/Models/Collection';

// Examples

interface User {
    name: string;
}

const UserRecord = Record<User>({ name: '' });

interface Message {
    value: string;
}

const MessageRecord = Record<Message>({ value: '' });

// No sub collections

async function ExampleOne() {
    const databaseOne = new Database({
        usersCollection: new Collection<User, null>('users', null)
    });

    const brandon = await databaseOne.collections.usersCollection.createDocument(new UserRecord({ name: 'Brandon' }));
    console.log(`User ${brandon.data.name} was created successfully`);
}

// With sub collections

async function exampleTwo() {
    const usersSubCollections = {
        messagesCollection: new SubCollection<Message, null>('messages', null)
    };

    const databaseTwo = new Database({
        usersCollection: new Collection<User, typeof usersSubCollections>('name', usersSubCollections)
    });

    const brandon = await databaseTwo.collections.usersCollection.createDocument(new UserRecord({ name: 'Brandon' }));
    console.log(`User ${brandon.data.name} was created successfully`);

    const message = await brandon.collections?.messagesCollection.createDocument(new MessageRecord({ value: 'Hi' }));
    console.log(`${brandon.data.name} sent a message that says ${message?.data.value}`);
}
