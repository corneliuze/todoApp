const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
    if(err){
     return  console.log('Unable to connect to the database');
    }
  console.log('connected')

  const db = client.db('TodoApp');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectId ('5c96af3ea323a6650ad3f417')
  },
  {
    $set: {
        completed : false
 }
  },
  {
      returnOriginal : false
  }).then((result) => {
      console.log(JSON.stringify(result))
  });

})