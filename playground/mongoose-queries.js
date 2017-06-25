const {mongoose} = require('./..server/db/mongoose');
const {Todo} = require('./..server/models/todo');

var id ='594fdf022c66757c6c97485e';

Todo.find({
  _id:id
}).then((todos)=>{
  console.log(todos);
});

Todo.findOne({
  _id:id
}).then((todo)=>{
  console.log('Todo',todo);
});

Todo.findById(id).then((todo)=>{
  console.log('Todo by id',todo);
});
