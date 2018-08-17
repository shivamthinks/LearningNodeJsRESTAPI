//NodeJs and third party modules
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to mongodb server.', error);
    }

    console.log('Connected to mongodb server.');

    const db = client.db('TodoApp');

    //Fetch - All documents
    db.collection('Todos').find().toArray()
        .then((documents) => {
            console.log(`All Todos: ${JSON.stringify(documents, undefined, 2)}`);
        })
        .catch((error) => {
            console.log('Unable to get documents', error);
        });

    //Fetch - Query based on fields
    db.collection('Todos').find({ completed: true, text: 'Todo 2' }).toArray()
        .then((documents) => {
            console.log(`True Todos: ${JSON.stringify(documents, undefined, 2)}`);
        })
        .catch((error) => {
            console.log('Unable to get documents', error);
        });

    //Fetch - Query based on _id field
    db.collection('Todos').find({ _id: new ObjectID('5b759d3f387afd2950cafcb4') }).toArray()
        .then((documents) => {
            console.log(`ObjectID Todos: ${JSON.stringify(documents, undefined, 2)}`);
        })
        .catch((error) => {
            console.log('Unable to get documents', error);
        });

    //Count - All documents
    db.collection('Todos').find().count()
        .then((count) => {
            console.log(`Total Todos Count: ${count}`);
        })
        .catch((error) => {
            console.log('Unable to get documents', error);
        });

    //Count - Query based on fields
    db.collection('Todos').find({ completed: false }).count()
        .then((count) => {
            console.log(`False Todos Count: ${count}`);
        })
        .catch((error) => {
            console.log('Unable to get documents', error);
        });

    client.close();
});