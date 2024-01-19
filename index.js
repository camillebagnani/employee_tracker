const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'employees_db'
    }
);

const prompts = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
        name: 'choice',
    },
];

const init = () => {
    inquirer.prompt(prompts)
        .then(({ choice }) => {
            if (choice === 'View All Departments') {
                db.connect(function (err) {
                    if (err) throw err;
                    db.query("SELECT * FROM department", function (err, results) {
                        if (err) throw err;
                        console.table(results);
                        init();
                    });
                });
            } else if (choice === 'View All Roles') {
                db.connect(function (err) {
                    if (err) throw err;
                    db.query("SELECT * FROM role", function (err, results) {
                        if (err) throw err;
                        console.table(results);
                    });
                });
            } else if (choice === 'View All Employees') {
                db.connect(function (err) {
                    if (err) throw err;
                    db.query("SELECT * FROM employee", function (err, results) {
                        if (err) throw err;
                        console.table(results);
                    });
                });
            } else if (choice === 'Add Department') {

            } else if (choice === 'Add Role') {

            } else if (choice === 'Add Employee') {

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