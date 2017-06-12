//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
  if (error) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log("Connected to MongoDb success");

  //deleteMany
// db.collection('Todos').deleteMany({text:'Eat pie'}).then((result)=>{
//   console.log(result);
// });

  //deleteOne
  // db.collection('Todos').deleteOne({text:'goosh that goosh'}).then((result)=>{
  //   console.log(result);
  // });

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    console.log(result);
  })

  //db.close();
});
