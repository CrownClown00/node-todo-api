const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

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





app.listen(3000,()=>{
  console.log('Started server on port 3000');
});
