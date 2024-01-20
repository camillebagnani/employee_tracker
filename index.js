const inquirer = require('inquirer');
const mysql = require('mysql2');
const { prompts, addDepartment, addRole, addEmployee} = require('./arrays')

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'employees_db'
    }
);

// const prompts = [
//     {
//         type: 'list',
//         message: 'What would you like to do?',
//         choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
//         name: 'choice',
//     },
// ];

// const addDepartment = [
//     {
//         type: 'input',
//         message: 'Please enter the department ID',
//         name: 'departmentID'
//     },
//     {
//         type: 'input',
//         message: 'Please enter the department name',
//         name: 'departmentName'
//     },
// ]

const init = () => {
    inquirer.prompt(prompts)
        .then(({ choice }) => {
            if (choice === 'View All Departments') {

                viewDB("SELECT * FROM department");

            } else if (choice === 'View All Roles') {

                viewDB("SELECT * FROM role");

            } else if (choice === 'View All Employees') {

                viewDB("SELECT * FROM employee");

            } else if (choice === 'Add Department') {

                editDB(addDepartment, "SELECT * FROM department");

            } else if (choice === 'Add Role') {

                editDB(addRole, "SELECT * FROM department");

            } else if (choice === 'Add Employee') {

                editDB(addEmployee, "SELECT * FROM department");

            } else if (choice === 'Update Employee Role') {

            } else {
                console.log('Use Control + C to quit application')
            }
        })
        .catch((error) => {
            console.log(error);
            console.log('Oops! Something went wrong.')
        })
}

init();

const viewDB = (query) => {
    db.connect(function (err) {
        if (err) throw err;
        db.query(query, function (err, results) {
            if (err) throw err;
            console.table(results);
            init();
        });
    });
};

const editDB = (questionArray, query) => {
    inquirer.prompt(questionArray)
        .then(() => {
            db.connect(function (err) {
                if (err) throw err;
                db.query(query, function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    init();
                });
            });
        });
};

