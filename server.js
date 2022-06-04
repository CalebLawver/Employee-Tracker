//imports
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

connection.connect(err => {
    if(err) throw err;
    console.log('Connected with ID ' + connection.threadId);
    connected();
});