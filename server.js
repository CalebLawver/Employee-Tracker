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

connect = () => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("        EMPLOYEE TRACKER        ")
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    prompt();
};

const prompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What do you want to do?',
            choices: 
            ['View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            "Update an employee's role",
            "Update an employee's manager",
            "View employee's by department",
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'View department budgets',
            'Nothing at this time!'
            ]
        }
    ])
    .then((answers) => {

    });
};

showDepartment = () => {

}

showRole() = () => {

}

showEmployees() = () => {

}

addDepartment() = () => {
    inquirer.prompt([
        {

        }
    ])
    .then(createdDep => {

    })
}

addEmployee() = () => {
    inquirer.prompt([
        {

        }
    ])
    .then(answer => {
        
    })
}

employeeDep = () => {

}

deleteDep = () => {

}

deleteRole = () => {

}

deleteEmp = () => {

}

viewBudget = () => {

}