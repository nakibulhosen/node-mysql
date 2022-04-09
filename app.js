const { response } = require('express');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// initialize express app 
const app = express();

// Add middlewares 

app.use(bodyParser.json())

// Create connection with mysql db 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school'
})

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Database Connected')
})

app.get('/', (req, res) => {
    let sqlQuery = 'select * from demo';
    db.query(sqlQuery, (err, result) => {
        if (err) throw err;
        // const sqlData = JSON.parse(result);
        console.log(result)
        res.send({ ...result, message: 'Database Connected Here are the data from the database' })
    })
})

// Create post 

app.post('/createpost', (req, res) => {
    const postTitle = req.body.title;
    const postbody = req.body.body;
    console.log('Post title', typeof postTitle);
    console.log('Post body', typeof postbody);
    let sqlQuery = 'insert into posts set?';
    db.query(sqlQuery, req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        };
        res.send({ ...result, ...req.body });
        console.log(result)
    })
})

// Get Posts 

app.get('/posts', (req, res) => {
    let sqlQuery = 'select * from posts';
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send({ ...result, message: "Get all post successfully" })
        }
    })
})

// starting the express server 
app.listen('3000', () => {
    console.log('App is listening to port 3000');
})