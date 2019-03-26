const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
    if(err){
      return   console.log('Unable to connect to the database');
    }
    console.log('Connected to the database');

const db = client.db('TodoApp');
// todelete many items
//db.collection('Todos').deleteMany({text : "eat out"}).then((result) =>{
  //  console.log(result);
//});

// to delete one item
//db.collection('Todos').deleteOne({ text : "eat out"}).then((result) =>{
  //  console.log(result);
//});

//to find one and delete

db.collection('Todos').findOneAndDelete({ text : "eat out"}).then((result) =>{
    console.log(result);
});

});