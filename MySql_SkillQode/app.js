const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.json());
app.use(express.urlencoded());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin@123',
    database: 'node_mysql'
});

connection.connect(() => {
    console.log('MySql is Connected!');
});

app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

app.post('/api/user', (req, res) => {
    const{ firstName, lastName, email, password, mobileNo} = req.body;
    let user = {
        firstName, lastName, email, password, mobileNo
    };
    connection.query('INSERT INTO user SET?', user, (err, data) => {
        if(err) 
        res.json(err);
    else 
    res.json(data);
    });
});

app.get('/api/user/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    connection.query('select * from user where firstName = '+ `"${id}"`, (err, data) => {
        if(err) 
        res.json(err);
    else
    res.json(data);
    })
});

app.listen(1919,() => {
    console.log('Server Start at http://localhost:1919');
});


// create table user(
//     firstName varchar (20),
//     lastName varchar (30),
//     email varchar(30),
//     password varchar(20),
//     mobileNo double
//  );