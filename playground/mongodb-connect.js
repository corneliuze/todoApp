const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to the database');
    }
    console.log('Connected to the database');


const db = client.db('TodoApp');


    db.collection('Todos').insertOne({
        text: 'something, i got to do',
        completed : true
    }, (err, result) =>{
        if(err){
            return console.log('error adding todo', err)
        }
        console.log('todo added', JSON.stringify(result.ops, undefined, 2));
    }
    );
db.collection('Users').insertOne({
    name : 'Falaye iyanu',
    age : 20,
    location : 'Ibadan'
}, (err, result) =>{
    if(err){
        return console.log('error adding users', err);
    }
    console.log('users added', JSON.stringify(result.ops, undefined, 2));
});
    client.close();

})