import firebase from 'firebase';
import 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Record } from 'immutable';

// Types

interface IDEnabled {
    id: string;
}

function isIDEnabled(value: unknown): value is IDEnabled {
    const casted = value as IDEnabled;
    return casted.id !== undefined;
}

interface DatabaseReferenceHolder {
    db: firebase.firestore.Firestore | null;
}

function isDatabaseReferenceHolder(value: unknown): value is DatabaseReferenceHolder {
    const casted = value as DatabaseReferenceHolder;
    return casted.db !== undefined;
}

interface CollectionHolder<T> {
    collections: T | null;
}

function shareDatabaseReference<T>(collections: T) {
    for (let collection in collections) {
        if (isDatabaseReferenceHolder(collection)) {
            collection.db = this.db;
        }
    }
}

interface SubCollectionData {
    reference: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> | null;
    setReference: (previousPath: string) => void;
}

function isSubCollectionData(value: unknown): value is SubCollectionData {
    const casted = value as SubCollectionData;
    return casted.setReference !== undefined;
}

type DataHolder<DataType> = Record<DataType> & Readonly<DataType>;

// Data Models

class Database<Collections> implements CollectionHolder<Collections>, DatabaseReferenceHolder {
    db: firebase.firestore.Firestore;
    collections: Collections;

    constructor(collections: Collections) {
        this.db = firebase.firestore();
        shareDatabaseReference(collections);
        this.collections = collections;
    }
}

class Collection<DataType, SubCollections> implements IDEnabled, CollectionHolder<SubCollections>, DatabaseReferenceHolder {
    id: string;
    db: firebase.firestore.Firestore | null;
    reference: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
    collections: SubCollections;

    constructor(id: string, subCollections: SubCollections | null) {
        this.id = id;
        this.db = null;
        this.reference = this.db.collection(this.id);
        this.collections = subCollections;
    }

    getFullPath(): string {
        return this.id;
    }

    async createDocument(data: DataHolder<DataType>): Promise<Document<DataType, SubCollections>> {
        const id = uuidv4();
        await this.reference.doc(id).set(data, { merge: true });
        let document;
        if (isIDEnabled(data) && data.has('id')) {
            document = ((data as unknown) as DataHolder<IDEnabled>).set('id', id);
        }
        return new Document(document, this.getFullPath(), this.collections);
    }
}

class SubCollection<DataType, SubCollections> extends Collection<DataType, SubCollections> implements SubCollectionData {
    reference: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> | null;
    previousPath: string;

    constructor(id: string, subCollections: SubCollections | null) {
        super(id, subCollections);
        this.reference = null;
        this.previousPath = null;
    }

    setReference(previousPath: string) {
        this.previousPath = previousPath;
        const components = this.getFullPath().split('/');
        let reference;
        components.forEach((value, index) => {
            if (index === 0) {
                reference = this.db.collection(value);
            } else if (index % 2 === 0) {
                reference = reference.collection(value);
            } else {
                reference = reference.doc(value);
            }
        });
        this.reference = reference;
    }

    getFullPath(): string {
        return `${this.previousPath}/${this.id}`;
    }
}

class Document<DataType, SubCollections> implements CollectionHolder<SubCollections> {
    collections: SubCollections;
    data: DataHolder<DataType>;
    previousPath: string;

    constructor(data: DataHolder<DataType>, previousPath: string, subCollections: SubCollections | null) {
        this.data = data;
        this.collections = subCollections;
        this.previousPath = previousPath;

        for (let subCollection in subCollections) {
            if (isSubCollectionData(subCollection) && isIDEnabled(data)) {
                subCollection.setReference(this.previousPath);
            }
        }
    }
}

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

    const message = await brandon.collections.messagesCollection.createDocument(new MessageRecord({ value: 'Hi' }));
    console.log(`${brandon.data.name} sent a message that says ${message.data.value}`);
}
