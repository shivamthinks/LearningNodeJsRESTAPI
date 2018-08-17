var port = process.env.PORT || 3000;

//NodeJs and third party modules
const express = require('express');
const bodyParser = require('body-parser'); //This takes the JSON and converts it into object.
const { ObjectID } = require('mongodb');

//Custom created modules
const { mongoose } = require('./db/mongooseconfig.js');
const { Todo } = require('./models/todomodel.js');
const { User } = require('./models/usermodel.js');

var app = express();

//This takes JSON which is sent in the body through client and converts it into object and attaches it to request object.
app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    var todo = new Todo({
        text: request.body.text
    });

    todo.save()
        .then((document) => {
            response.send(document);
        })
        .catch((error) => {
            response.status(400).send(error);
        });
});

app.get('/todos', (request, response) => {
    Todo.find()
        .then((documents) => {
            response.send({ documents });
        })
        .catch((error) => {
            response.status(400).send(error);
        });
});

app.get('/todos/:id', (request, response) => {
    var id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Todo.findById(id)
        .then((documents) => {
            if (!documents) {
                response.status(404).send();
            }

            return response.send({ documents });
        })
        .catch((error) => {
            response.status(400).send();
        });
});

app.listen(port, () => {
    console.log(`Started server at ${port}.`);
});

//Exported for testing.
module.exports = {app};