const request = require('supertest');
const expect = require('expect');

const {ObjectID} = require('mongodb');

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos =[
  {
    _id:new ObjectID(),
    text:'First test todos'
  },
  {
    _id:new ObjectID(),
    text:'Second test todos',
    completed:true,
    completedAt:333
  }
];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
      return Todo.insertMany(todos)
    }).then(()=>done());
});

describe('POST/todos', ()=>{
  it('Should creat a new todo', (done)=>{
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((response)=>{
       expect(response.body.text).toBe(text);
    })
    .end((error,response)=>{
      if(error){
        return done(error);
      }
      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err)=>done(err));
    });
  });

  it('should not create todo with invakid data', (done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((error,response)=>{
      if(error){
        return done(error)
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((err)=>done(err));
    })
  });

});

describe('GET /todos',()=>{
  it('should get all todos', (done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((response)=>{
      expect(response.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id',()=>{
  it('should return todo doc',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((response)=>{
      expect(response.body.todos.text).toBe(todos[0].text)
    })
    .end(done);
  })

  it('should return 404 if todo not found', (done)=>{
    var newID = new ObjectID();
    request(app)
    .get(`/todos/${newID.toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for non object ids', (done)=>{
    var newID = new ObjectID();
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos/:id', ()=>{
  it('should remove todo',(done)=>{
    var hexId = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((response)=>{
      expect(response.body.todo._id).toBe(hexId);
    })
    .end((error,resonse)=>{
      if(error){
        return done(error);
      }
      Todo.findById(hexId).then((todo)=>{
        expect(todo).toNotExist();
        done();

      }).catch((error)=>(done));

    })
  });

  it('should return 404 if todo not found',(done)=>{
    var newID = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if object id is not valid',(done)=>{
    var newID = new ObjectID();
    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos:id',()=>{
  it('should update todo',(done)=>{

    var hexId = todos[0]._id.toHexString();
    var text ="this da new text";
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed:true,
      text
    })
    .expect(200)
    .expect((response)=>{
      expect(response.body.todo.text).toBe(text)
      expect(response.body.todo.completed).toBe(true)
      expect(response.body.todo.completedAt).toBeA('number')
    })
    .end(done)


  });

  it('should clear completedAt when todo is not completed', (done)=>{
    var hexId = todos[1]._id.toHexString();
    var text = "daaaa newwww text";
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed:false,
      text
    })
    .expect(200)
    .expect((response)=>{
      expect(response.body.todo.text).toBe(text)
      expect(response.body.todo.completed).toBe(false)
      expect(response.body.todo.completedAt).toNotExist()
    })
    .end(done);
  })
})
