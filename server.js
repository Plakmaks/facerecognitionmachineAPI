const express = require ('express');
const bodyParser = require ('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'teamerlan1q',
      database : 'smart-machine'
    }
});

db.select('*').from('users').then(data =>{
    console.log(data);
});

const app = express();

const database = {
    users: [
        {
            id:'1267',
            name:'max',
            password:'cookies',
            email:'pox@gmail.com',
            entries:0,
            joined: new Date()
        },
        {
            id:'124435345',
            name:'asdf',
            password:'123',
            email:'p@gmail.com',
            entries:0,
            joined: new Date()
        }
    ]
}

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req,res)=> {
    res.send(database.users);
})

app.post('/signin',(req,res) => {
    let userfound = false
    db.users.forEach(user => {
        if  (req.body.email === user.email &&
            req.body.password === user.password){
                res.json(user);
                userfound = true;
            } 
        })
        if (!userfound){
            res.status(400).json('not found');
        }
})

app.post('/register', (req,res)=> {
    const {email, name, password} = req.body;
    db('users').insert({
        email: email,
        name: name,
        
    }).then(console.log)
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res)=>{
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found){
        res.status(400).json('not found');
    }
 })

app.put('/image',(req,res) =>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found){
        res.status(400).json('not found');
    }
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})


/*

*/