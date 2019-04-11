const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const { Todo } = require('./model/todos');
const { UserModel, generateToken, findByToken } = require('./model/users');
const { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("welcome to the express todo app");
}, (err) => {
    console.log("error dey daddy", err);
})

app.post('/users', (req, res) => {


    UserModel.create({
        email: req.body.email,
        password: req.body.password

    })
        .then(async (data) => {


            const token = generateToken(data._id);
            var ok = await UserModel.findOne({_id : data._id});
            console.log('ok is this', ok);
            ok.token = token;
            ok.save().then(() => {
                return res.header('x-auth', token).send({
                    code: 200,
                    error: false,
                    token: token,
                    message: 'user created successfully',
                    user: data
                });
            });
        })
        .catch((err) => {
            console.log('unable to save', err);
            return res.send({
                code: 400,
                error: true,
                message: 'unable to create user'
            })
        })
});


app.post('/todos', (req, res) => {
    console.log(req.body.text)
    const todo = new Todo({
        text: req.body.text
    });
    todo.save().then((docs) => {
        res.send(docs);
    })
        .catch((err) => {
            res.status(400).send(err);
        });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send(todos)
    }, (e) => {
        res.status(400).send(e)
    })

});



app.get('/todos/:id', (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        console.log({ todo })
        res.send({ todo })

    }).catch((e) => {
        res.status(400).send()
    })


});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid()) {
        console.log("yeah man")
        return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false,
            body.completedAt = null
    }
    Todo.findByIdAndUpdate(id, { set: body }, { new: true }).then((todo) => {
        if (!todo) {
            console.log("no todo db")
            return res.status(404).send();

        }
        res.send(todo);
    }).catch((e) => {
        res.status(400).send('fuckup bro');
    });

});

app.get('/users/me', (req, res) => {

    var token = req.header('x-auth')
    findByToken(token).then((user) => {


        if (!user) {
            return Promise.reject();
        }
        res.send(user);
    }).catch((e) => {
        console.log('error is', e);
        res.status(401).send(e);
    })
});






app.listen(port, () => {
    console.log('server started on port ', port);
});

module.exports = { app }