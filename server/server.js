const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(request,response)=>{
  console.log(request.body);
  var todo = new Todo({
    text: request.body.text
  });

  todo.save().then((doc)=>{
    response.send(doc)
  }, (error)=>{
    response.status(400).send(error)
  });
});

app.get('/todos',(request,response)=>{
  Todo.find().then((todos)=>{
    response.send({todos})
  },(error)=>{
      response.status(400).send(error)
  });
});


app.get('/todos/:id',(request,response)=>{
  var id = request.params.id;

  if(!ObjectID.isValid(id)){
    return response.status(404).send();
  }

  Todo.findById(id).then((todos)=>{
      if(!todos){
        return response.status(404).send();
      }
       response.send({todos})
  }).catch((e)=>{
    response.status(400).send();
  });
});









app.listen(3000,()=>{
  console.log('Started server on port 3000');
});

module.exports ={app};
