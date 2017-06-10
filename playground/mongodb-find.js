//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
  if (error) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log("Connected to MongoDb success");

  // db.collection('Todos').find({_id}).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined, 2));
  // },(error)=>{
  //   if (error) {
  //     return "There was a poblem captain" + error;
  //   }
  // });

  db.collection('Users').find({name:'Ross'}).count().then((count)=>{
    console.log(`count:${count}`);
  },(error)=>{
    console.log(error);
  });


  //db.close();
});
