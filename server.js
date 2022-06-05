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
    console.log('Showing roles');
    const sql = `SELECT roles.id, roles.title, department.name AS department FROM roles INNER JOIN department ON roles.department_id = department.id`

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        prompt();
    });
};

showEmployee = () => {
    console.log('Showing employees');
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, 
                concat (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        prompt();
    })
}

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What department are you adding?',
            validate: addDept => {
                if (addDept) {
                    return true;
                } else {
                    console.log('Please enter a department');
                    return false;
                }
            }
        }
    ])
    .then(createdDep => {
        const sql = `INSERT INTO department (name) VALUES (?)`;

        connection.query(sql, createdDep.addDept, (err, result) => {
            if (err) throw err;
            console.log('You have added ' + createdDep.addDept + " to departments");

            showDepartment();
        })
    })
}

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the role you want to add?',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter a role');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is this roles salary?',
            validate: addSal => {
                if (isNaN(addSal)) {
                    console.log('Please enter a salary');
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(addedRole => {
        const params = [addedRole.role, addedRole.salary];

        const roleSql = `SELECT name, id FROM department`;

        connection.query(roleSql, (err, data) => {
            if (err) throw err;

            const dept = data.map(({ name, id }) => ({ name: name, value: id}));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'dept',
                    message: 'What department is this role in?',
                    choices: dept
                }
            ])
            .then(deptChoice => {
                const dept = deptChoice.dept ;
                params.push(dept);

                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

                connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('You have added ' + addedRole.role + ' to roles.');
                    showRole();
                });
            });
        });
    });
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