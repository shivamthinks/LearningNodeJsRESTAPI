//NodeJs and third party modules.
const { MongoClient, ObjectID } = require('mongodb'); //MongoDB native library. The syntax used is object destructuring.

//Generating ObjectId using mongodb.
//var objectId = new ObjectID();
//console.log(objectId);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server.', error);
    }

    console.log('Connected to MongoDB server.');

    //Get DB instance from the client
    const db = client.db('TodoApp');

    //Insert with mongodb generated _id.
    db.collection('Todos').insertOne({
        text: 'Todo 1',
        completed: true
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert todo', error);
        }

        console.log(`Added the below document at ${result.ops[0]._id.getTimestamp()}: ${JSON.stringify(result.ops, undefined, 2)}`);
    });

    //Insert with custom generated _id.
    //db.collection('Todos').insertOne({
    //    _id: 123, 
    //    text: 'Todo 2',
    //    completed: false
    //}, (error, result) => {
    //    if (error) {
    //        return console.log('Unable to insert todo', error);
    //    }

    //    console.log(`Added: ${JSON.stringify(result.ops, undefined, 2)}`);
    //});

    //Insert with custom generated _id.
    db.collection('Todos').insertOne({
        _id: new ObjectID(), 
        text: 'Todo 2',
        completed: false
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert todo', error);
        }

        console.log(`Added: ${JSON.stringify(result.ops, undefined, 2)}`);
    });

    client.close();
});