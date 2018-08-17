//NodeJs and third party modules
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to mongodb server.', error);
    }

    console.log('Connected to mongodb server.');

    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate(
        { _id: new ObjectID('5b759d4f42b20341e050b19d') }, //find
        { //update
            $set: {
                text: 'Todo 1',
                completed: true,
                description: 'This is Todo 1.' //If a field doesn't exists, a new field can be added in update.
            },
            $inc: {
                priority: 1
            }
        },
        { //options
            returnOriginal: false
        }
    )
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log('Unable to update document', error);
        });

    client.close();
});