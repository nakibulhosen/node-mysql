const express = require('express');
const mysql = require('mysql');

// initialize express app 
const app = express();

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

// starting the express server 
app.listen('3000', () => {
    console.log('App is listening to port 3000');
})