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
    connect();
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
        const { choices } = answers;

        if(choices === 'View all departments') {
            showDepartment();
        }
        if (choices === "View all roles") {
            showRole();
        }
        if (choices === "View all employees") {
            showEmployee();
        }
        if (choices === "Add a department") {
            addDepartment();
        }
        if (choices === "Add a role") {
            addRole();
        }
        if (choices === "Add an employee") {
            addEmp();
        }
        if (choices === "Update an employee role") {
            updateEmp();
        }
        if (choices === "Update an employee manager") {
            updateManager();
        }
        if (choices === "View employees by department") {
            employeeDep();
        }
        if (choices === "Delete a department") {
            deleteDep();
        }
        if (choices === "Delete a role") {
            deleteRole();
        }
        if (choices === "Delete an employee") {
            deleteEmp();
        }
        if (choices === "View department budgets") {
            viewBudget();
        }
        if (choices === "No Action") {
            connection.end()
        };
    });
};

showDepartment = () => {
    console.log('Showing departments');
    const sql = `SELECT department.id, department.name AS department FROM department`;

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows)
        prompt();
    });
};

showRole = () => {

}

showEmployees = () => {

}

addDepartment = () => {
    inquirer.prompt([
        {

        }
    ])
    .then(createdDep => {

    })
}

addEmp = () => {
    inquirer.prompt([
        {

        }
    ])
    .then(answer => {
        
    })
}

updateEmp = () => {

}

updateManager = () => {

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