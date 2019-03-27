const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require ("./../model/todos");

const mTodos = [{
   text : "hello people"
},
{
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
                    console.log(res.body)
                     expect(res.body.length).toBe(2)
                })
                .end(done);
    })
});