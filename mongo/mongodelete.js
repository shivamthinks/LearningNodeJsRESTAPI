const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server.', error);
    }

    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    //Delete - Many
    db.collection('Todos').deleteMany({ completed: false, _id: new ObjectID('5b759d3f387afd2950cafcb4') })
        .then((result) => {
            console.log(`Delete Many result: ${JSON.stringify(result, undefined, 2)}`);
        })
        .catch((error) => {
            console.log('Unable to delete documents', error);
        });

    db.collection('Todos').deleteMany({ completed: false, _id: new ObjectID('5b759d3f387afd2950cafcb5') });

    //Delete - One
    db.collection('Todos').deleteOne({ text: 'Todo 1' })
        .then((result) => {
            console.log(`Delete One result: ${JSON.stringify(result, undefined, 2)}`);
        })
        .catch((error) => {
            console.log('Unable to delete documents', error);
        });

    //Delete - Find One and Delete
    db.collection('Todos').findOneAndDelete({ completed: false })
        .then((result) => {
            console.log(`Find One and Delete result: ${JSON.stringify(result, undefined, 2)}`);
        })
        .catch((error) => {
            console.log('Unable to delete documents', error);
        });
});