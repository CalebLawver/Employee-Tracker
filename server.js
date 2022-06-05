//imports
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected with ID " + connection.threadId);
  connect();
});

connect = () => {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("        EMPLOYEE TRACKER        ");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  prompt();
};

const prompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What do you want to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee's role",
          "Update an employee's manager",
          "View employee's by department",
          "Delete a department",
          "Delete a role",
          "Delete an employee",
          "View department budgets",
          "Nothing at this time!",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === "View all departments") {
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
      if (choices === "Update an employee's role") {
        updateEmp();
      }
      if (choices === "Update an employee's manager") {
        updateManager();
      }
      if (choices === "View employee's by department") {
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
      if (choices === "Nothing at this time!") {
        connection.end();
      }
    });
};

showDepartment = () => {
  console.log("Showing departments");
  const sql = `SELECT department.id, department.name AS department FROM department`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    prompt();
  });
};

showRole = () => {
  console.log("Showing roles");
  const sql = `SELECT roles.id, roles.title, department.name AS department FROM roles INNER JOIN department ON roles.department_id = department.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    prompt();
  });
};

showEmployee = () => {
  console.log("Showing employees");
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, 
                concat (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    prompt();
  });
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "What department are you adding?",
        validate: (addDept) => {
          if (addDept) {
            return true;
          } else {
            console.log("Please enter a department");
            return false;
          }
        },
      },
    ])
    .then((createdDep) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;

      connection.query(sql, createdDep.addDept, (err, result) => {
        if (err) throw err;
        console.log("You have added " + createdDep.addDept + " to departments");

        showDepartment();
      });
    });
};

addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the role you want to add?",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please enter a role");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is this roles salary?",
        validate: (addSal) => {
          if (isNaN(addSal)) {
            console.log("Please enter a salary");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((addedRole) => {
      const params = [addedRole.role, addedRole.salary];

      const roleSql = `SELECT name, id FROM department`;

      connection.query(roleSql, (err, data) => {
        if (err) throw err;

        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "dept",
              message: "What department is this role in?",
              choices: dept,
            },
          ])
          .then((deptChoice) => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log("You have added " + addedRole.role + " to roles.");
              showRole();
            });
          });
      });
    });
};

addEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
        validate: (first) => {
          if (first) {
            return true;
          } else {
            console.log("Please enter their first name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (last) => {
          if (last) {
            return true;
          } else {
            console.log("Please enter their last name");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.firstName, answer.lastName];

      const roleSql = `SELECT roles.id, roles.title FROM roles`;

      connection.query(roleSql, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roles,
            },
          ])
          .then((roleList) => {
            const role = roleList.roles;
            params.push(role);

            const managerSql = `SELECT * FROM employee`;

            connection.query(managerSql, (err, data) => {
              if (err) throw err;

              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the new employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  params.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;

                  connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added");
                    showEmployee();
                  });
                });
            });
          });
      });
    });
};

updateEmp = () => {
  const empSql = `SELECT * FROM employee`;

  connection.query(empSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee do you want to update?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const roleSql = `SELECT * FROM roles`;

        connection.query(roleSql, (err, data) => {
          if (err) throw err;
          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.roles;
              params.push(role);

              let employee = params[0];
              params[0] = role;
              params[1] = employee;
              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;


              connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("This employee has been updated.");
                showEmployee();
              });
            });
        });
      });
  });
};

updateManager = () => {
    const employeeSql = `SELECT * FROM employee`;

    connection.query(employeeSql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee do you want to update?',
                choices: employees
            }
        ])
        .then(empChoice => {
            const employee = empChoice.name;
            const params = [];
            params.push(employee);

            const managerSql = `SELECT * FROM employee`;
            connection.query(managerSql, (err, data) => {
                if (err) throw err;
                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name +" " + last_name, value: id }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is this employee's manager?",
                        choices: managers
                    }
                ])
                .then(managerChoice => {
                    const manager = managerChoice.manager;
                    params.push(manager);

                    let employee = params[0]
                    params[0] = manager 
                    params[1] = employee

                    const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

                    connection.query(sql, params, (err, result) => {
                        if (err) throw err;
                        console.log('Employee has had their manager updated');
                        showEmployee();
                    });
                });
            });
        });
    });
};

employeeDep = () => {
    console.log('Showing employee by department');
    const sql = `SELECT employee.first_name, employee.last_name, department.name AS department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id`;

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        prompt();
    })
};

deleteDep = () => {
    const deptSql = `SELECT * FROM department`;

    connection.query(deptSql, (err, data) => {
        if (err) throw err;
        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'dept',
                message: "Which department would you like to delete?",
                choices: dept
            }
        ])
        .then(deptChoice => {
            const dept = deptChoice.dept;
            const sql = `DELETE FROM department WHERE id = ?`;

            connection.query(sql, dept, (err, result) => {
                if (err) throw err;
                console.log('This department was deleted');
                showDepartment();
            });
        });
    });
};

deleteRole = () => {
    const roleSql = `SELECT * FROM role`;
    connection.query(roleSql, (err, data) => {
        if (err) throw err;
        const role = data.map(({ title, id }) => ({ name: title, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What role are you deleting?',
                choices: role
            }
        ])
        .then(roleChoice => {
            const role = roleChoice.role;
            const sql = `DELETE FROM role WHERE id = ?`;

            connection.query(sql, role, (err, result) => {
                if (err) throw err;
                console.log('This role has been deleted');
                showRole();
            });
        });
    });
};

deleteEmp = () => {
    const empSql = `SELECT * FROM employee`;

    connection.query(sql, employee, (err, result) => {
        if (err) throw err;
        
        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "which employee are you deleting?",
                choices: employees
            }
        ])
        .then(empChoice => {
            const employee = empChoice.name;
            const sql = `DELETE FROM employee WHERE id = ?`;

            connection.query(sql, employee, (err, result) => {
                if (err) throw err;
                console.log('This employee has been deleted');
                showEmployee();
            })
        })
    })
};

viewBudget = () => {};
