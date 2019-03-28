const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require ("./../model/todos");

const mTodos = [{
    _id : new ObjectID(),
   text : "hello people"
},
{
    _id : new ObjectID(),
    text : "hello world"
}];

beforeEach((done) =>{
    Todo.remove({}).then(() => {
         return Todo.insertMany(mTodos)   
   
}).then(() => done()) });

describe('POST /todos', () => {
    it('should create a new todo', (done) =>{
        var text = "text todo text";

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) =>{
            expect(res.body.text).toBe(text);
        }).end((err, todos)=>{
            if(err){
                return done(err);
            }
            Todo.find({text}).then((todos) =>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        })

    });

    it('it should not create a todo with invalid body data', (done) =>{
     request(app)
     .post('/todos')
     .send()
     .expect(400).end((err, todos) =>{
         if(err){
             return done(err);
         }
         Todo.find().then((todos) =>{
             expect(todos.length).toBe(2);
             done()
         }).catch((e)=> done(e));
     })
    });


});

describe('Get /todos', () => {
    it('should get list of all todos', (done) =>{
                request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                     expect(res.body.length).toBe(2)
                })
                .end(done);
    })
});

describe('GET /todos/:id', () =>{
it('should get todo by id', (done) =>{
    request(app)
    .get('/todos/${todos[0]._id.toHexString()}')
    .expect(200)
    .expect((res) =>{
        expect(res.body.text).toBe(todos[0].text);

    }).end(done);

});

});