const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
    if(err){
        return console.log('Unable to connect to mongo db');
    }
    console.log('connected to mongodb');

const db = client.db('TodoApp')

db.collection('Todos').find().count().then((count) =>{
    console.log('Todos count ', count);
}, (err) =>{
    console.log('error when finding the db', err)
})

})
