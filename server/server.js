const express = require('express');
const bodyParser = require('body-parser');
const {Todo} = require('./model/todos');
const{User} = require('./model/users');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const port = process.env.PORT||3000;


const app = express();
app.use(bodyParser.urlencoded({extended : false }))
app.use(bodyParser.json());


app.get('/' , (req, res) =>{
    res.send("welcome to the express todo app");
}, (err) =>{
    console.log("error dey daddy", err);
})

app.post('/todos', (req, res) =>{
    console.log(req.body.text)
    const todo = new Todo({
        text : req.body.text
    });
    todo.save().then((docs) =>{
        res.send(docs);
    })
    .catch((err) =>{
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) =>{
    Todo.find().then((todos) =>{
        res.send(todos)
    },(e) =>{
        res.status(400).send(e)
    })

});



app.get('/todos/:id',(req, res) =>{
    var id = req.params.id
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) =>{
        if(!todo){
            res.status(404).send();
        }
        console.log({todo})
        res.send({todo})

    }).catch((e) =>{
        res.status(400).send()
    })


});

app.delete('/todos/:id', (req, res) =>{
    var id =  req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) =>{
        if(!todo){
            res.status(404).send();
        }
        res.send({todo});
    });
});

app.post('users', (req, res) =>{
    const user = new User({
        email : req.body.text
    });
    user.save().then((doc) =>{
        res.send(doc);
    }, (err) =>{
        res.status(400).send(err);
    });
});

app.listen(port, ()=>{
    console.log('server started on port ', port);
}); 
module.exports = {app};