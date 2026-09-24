const DABASE_NAME = 'M2WEB'
const collection  = 'contacts'
const MONGO_URL = 'mongodb://localhost:27017';

import { MongoClient } from 'mongodb';

async function printAllContacts(collection) {
    const results = await collection.find().toArray();
    for (const result of results) {
        console.log(`Contact : ${result.name} is ${result.age}`);
    }
}

async function main() {
    let connection;
    try {
        console.log('Trying to connect...')
        const client = new MongoClient(MONGO_URL);
         /*, {
            useNewUrlParser: true
        });*/
        connection = await client.connect();
        console.log("Successfully connected to MongoDB.");
        const db = connection.db(DABASE_NAME);
        const contacts = db.collection(collection);
        await printAllContacts(contacts);
    } catch (e) {
        console.error(e)
    } finally {
        if (connection) {
            connection.close();
        }
    }
}

main();
