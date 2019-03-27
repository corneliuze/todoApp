const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todos');

var id = '5c9b4fe201ea446cb8ffe4da';

Todo.find({
    _id : id
}).then((todos) =>{
    console.log('Todos', todos);
});

Todo.findOne({
    _id : id
}).then((todo) =>{
    console.log('Todo', todo)
});

Todo.findById(id).then((todo) => {
    console.log('Todo by id', todo)
});