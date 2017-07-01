const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

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


app.delete('/todos/:id',(request,response)=>{
    //get id
      var id = request.params.id;

      //validate id
      if(!ObjectID.isValid(id)){
        return response.status(404).send();
      }

      Todo.findByIdAndRemove(id).then((todo)=>{
         if(!todo){
           return response.status(404).send();
         }
         response.send({todo});
      }).catch((error)=>{
          response.status(400).send();
      })
})






app.listen(port,()=>{
  console.log(`started up at port: ${port}`);
});

module.exports ={app};
