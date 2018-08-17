const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
}); 

var newTodo = new Todo({
    text: 'Cook dinner.'
});

var otherTodo = new Todo({
    text: 'Feed the birds.',
    completed: true,
    completedAt: 123
});

var newUser = new User({
    email: 'shivamthinks@outlook.com'
});

newTodo.save()
    .then((documents) => {
        console.log('Saved todo', documents);
    })
    .catch((error) => {
        console.log('Unable to save todo', error);
    });

otherTodo.save()
    .then((documents) => {
        console.log('Saved todo', documents);
    })
    .catch((error) => {
        console.log('Unable to save todo', error);
    });

newUser.save()
    .then((documents) => {
        console.log('Saved user', documents);
    })
    .catch((error) => {
        console.log('Unable to save user', error);
    });