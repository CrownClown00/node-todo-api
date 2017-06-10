//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
  if (error) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log("Connected to MongoDb success");

  // db.collection('Todos').insertOne({
  //   text:'Something to do',
  //   completed: false
  //
  // },(error,result)=>{
  //     if (error) {
  //       return console.log('There was an error unable to connect!',error);
  //     }
  //     console.log(JSON.stringify(result.ops));
  // })

  db.collection('Users').insertOne({
    name: 'Ross',
    age: '1000',
    loaction: 'Everywhere'
  },(error,result)=>{
    if (error) {
      return console.log('There was an error unable to connect!',error);
    }
    console.log(JSON.stringify(result.ops));
  })
  db.close();
});
