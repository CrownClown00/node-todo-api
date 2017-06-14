const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

beforeEach((done)=>{
    Todo.remove({}).then(()=>done());
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
      Todo.find().then((todos)=>{
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
        expect(todos.length).toBe(0);
        done();
      }).catch((err)=>done(err));
    })
  });

})