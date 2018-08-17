//NodeJs and third party modules
const { ObjectID } = require('mongodb');

//Custom created modules
const { mongoose } = require('./../server/db/mongooseconfig.js');
const { Todo } = require('./../server/models/todomodel.js');

var id = '5b771817546aa952ecbe1c93';

if (!ObjectID.isValid(id)) {
    return console.log('ID not valid.');
}

//Gets all the documents
Todo.find({
    _id: id //mongoose will automatically convert id of type string to type ObjectID.
})
    .then((documents) => {
        if (!documents) {
            return console.log('Id not found.');
        }

        console.log('Todos: ', documents);
    })
    .catch((error) => {
        console.log('Unable to get the documents', error);
    });

//Get one document
Todo.findOne({
    _id: id //mongoose will automatically convert id of type string to type ObjectID.
})
    .then((documents) => {
        if (!documents) {
            return console.log('Id not found.');
        }

        console.log('Todos: ', documents);
    })
    .catch((error) => {
        console.log('Unable to get the documents', error);
    });

Todo.findById(id)
    .then((documents) => {
        if (!documents) {
            return console.log('Id not found.');
        }

        console.log('Todos: ', documents);
    })
    .catch((error) => {
        console.log('Unable to get the documents', error);
    });