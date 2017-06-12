//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
  if (error) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log("Connected to MongoDb success");


  //findOneAndUpdate
  db.collection('Users').findOneAndUpdate({name:"Ross"},{$set:{
    name:"The Hero"
  }},{$inc:{
    age:1
  }},{
    returnOriginal:false
  }).then((result)=>{
    console.log(result);
  });



  //db.close();
});
