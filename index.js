const inquirer = require('inquirer');
const mysql = require('mysql2');
const { prompts, addDepartmentArray, addRoleArray, addEmployeeArray, updateEmployeeArray } = require('./arrays')
const { runInquirer } = require('./functions');

// Store SQL connection in a variable called 'db'
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'employees_db'
    }
);

// Serves as the main menu of the application by including Inquirer prompts and corresponding functions per choice
const init = () => {
    inquirer.prompt(prompts)
        .then(({ choice }) => {
            if (choice === 'View All Departments') {

                viewDatabase("SELECT * FROM department");

            } else if (choice === 'View All Roles') {

                viewDatabase("SELECT * FROM role");

            } else if (choice === 'View All Employees') {

                viewDatabase("SELECT * FROM employee");

            } else if (choice === 'Add Department') {

                addDepartment();

            } else if (choice === 'Add Role') {

                addRole();

            } else if (choice === 'Add Employee') {

                addEmployee();

            } else if (choice === 'Update Employee Role') {

                updateEmployee();

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

// Takes in the query of which database the user wants to view
const viewDatabase = (query) => {
    db.connect(function (err) {
        if (err) throw err;
        db.query(query, function (err, results) {
            if (err) throw err;
            console.table(results);
            // Calls the main menu back up once user completes action
            init();
        });
    });
};

// const addDepartment = () => {
//     inquirer.prompt(addDepartmentArray).then((answers) => {
//         db.query("INSERT INTO department SET ?", {
//             name: answers.departmentName,
//         }, function (err) {
//             if (err) throw err;
//             console.log("Department added");
//             init();
//         });
//     });
// };

// Uses runInquirer function to initialize Inquirer with the parameters and init() function
const addDepartment = () => {
    runInquirer(addDepartmentArray, "INSERT INTO department SET ?", "departmentName", "Department added", init);
};

const addRole = () => {
    // Selects id and name from department table to be used to create existingDepartments array
    db.query("SELECT id, name FROM department", function (err, results) {
        if (err) throw err;

        // Map uses query results to create a value and name property for each row of the table
        const existingDepartments = results.map(department => ({
            value: department.id,
            name: department.name
        }));

        // Stores the Inquirer roleDepartment question of the addRoleArray in variable called roleDepartmentQuestion
        // Find method finds the object in the array by it's name property
        const roleDepartmentQuestion = addRoleArray.find(question => question.name === 'roleDepartment');

        // If the question is found and the type is 'list', the choices are the database's existing departments
        if (roleDepartmentQuestion && roleDepartmentQuestion.type === 'list') {
            roleDepartmentQuestion.choices = existingDepartments;
        } else {
            console.error("Oops! Error occured when updating choices for role department");
        };

        // Uses the addRoleArray
        inquirer.prompt(addRoleArray).then((answers) => {
            // Uses Node.js MySQL INSERT INTO query
            db.query("INSERT INTO role SET ?", {
                title: answers.roleTitle, // Inserts answer for roleTitle question into the title column
                salary: answers.roleSalary, // Inserts answer for roleSalary question into the salary column
                department_id: answers.roleDepartment // Inserts answer for roleDepartmentQuestion into department_id column
            }, function (err) {
                if (err) throw err;
                console.log("Role added");
                // Starts main menu over again once Add Role is complete
                init();
            });
        });
    });
};

const addEmployee = () => {
    // Selects id and title from role table to be used to create existingRoles array
    db.query("SELECT id, title FROM role", function (err, results) {
        if (err) throw err;
        const existingRoles = results.map(role => ({
            value: role.id,
            name: role.title
        }));

        // Dynamically creates choices for the employeeRoleQuestion in the addEmployeeArray
        const employeeRoleQuestion = addEmployeeArray.find(question => question.name === 'employeeRole');

        // If the question is found and the type is 'list', the choices are the database's existing roles
        if (employeeRoleQuestion && employeeRoleQuestion.type === 'list') {
            employeeRoleQuestion.choices = existingRoles;
        } else {
            console.error(`Oops! Error occured when updating choices for employee role`)
        };

        // Selects id, first_name, last_name from employee table to be used to create existingEmployees array
        db.query("SELECT id, first_name, last_name FROM employee", function (err, results) {
            if (err) throw err;
            const existingEmployees = results.map(employee => ({
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            }));

            // Dynamically creates choices for the employeeManagerQuestion in the addEmployeeArray
            const employeeManagerQuestion = addEmployeeArray.find(question => question.name === 'employeeManager');

            // If the question is found and the type is 'list', the choices are the database's existing employees 
            if (employeeManagerQuestion && employeeManagerQuestion.type === 'list') {
                employeeManagerQuestion.choices = existingEmployees;
            } else {
                console.error(`Oops! Error occured when updating choices for manager`)
            }

            // Uses addEmployeeArray to ask Inquirer questions
            inquirer.prompt(addEmployeeArray).then((answers) => {
                db.query("INSERT INTO employee SET ?", {
                    first_name: answers.employeeFirst, // Inserts answer for employeeFirst question into the first_name column
                    last_name: answers.employeeLast, // Inserts answer for employeeLast question into last_name column
                    role_id: answers.employeeRole, // Inserts answer for employeeRole question into role_id column
                    manager_id: answers.employeeManager // Inserts answer for employeeManager question into manager_id column
                }, function (err) {
                    if (err) throw err;
                    console.log("Employee added");
                    init();
                });
            });
        });
    });
};

//TODO: Fix so that it doens't turn update into null
const updateEmployee = () => {
    // Gets id, first and last name from employee table in order to create an array of existing employees
    db.query("SELECT id, first_name, last_name FROM employee", function (err, results) {
        if (err) throw err;
        // Uses map to create key value pairs for each employee consisting of the employee's id and name
        const existingEmployees = results.map(employee => ({
            value: employee.id,
            name: `${employee.first_name} ${employee.last_name}`
        }));

        // Finds the first question that matches the name property
        const updatedEmployeeQuestion = updateEmployeeArray.find(question => question.name === 'updateEmployeeName');

        // If the question is found and the type is 'list', the choices are the database's existing employees 
        if (updatedEmployeeQuestion && updatedEmployeeQuestion.type === 'list') {
            updatedEmployeeQuestion.choices = existingEmployees;
        } else {
            console.error(`Oops! Error occured when displaying employees`)
        };

        // Selects id and title columns from role table to make an array of existing roles uses key value pairs including the role's id and role's title
        db.query("SELECT id, title FROM role", function (err, results) {
            if (err) throw err;
            const existingRoles = results.map(role => ({
                value: role.id,
                name: role.title
            }));

            // Finds the first question that matches the name property
            const updatedRoleQuestion = updateEmployeeArray.find(question => question.name === 'updateEmployeeRole');

            // If the question is found and the type is 'list', the choices are the database's existing roles 
            if (updatedRoleQuestion && updatedRoleQuestion.type === 'list') {
                updatedRoleQuestion.choices = existingRoles;
            } else {
                console.error(`Oops! Error occured when updating choices for employee role`)
            }
            // Inquirer uses updatedEmployeeArray questions and takes the answers in for the mySQL query
            inquirer.prompt(updateEmployeeArray).then((answers) => {
                db.query("UPDATE employee SET first_name = ?, last_name = ?, role_id = ? WHERE id = ?",
                    [answers.employeeFirst, // Updates the first name with the answer from the employeeFirst question
                    answers.employeeLast, // Updates the last name with the answer from the employeeLast question
                    answers.employeeRole, // Updates the role id with the answer from the employeeRole question
                    answers.updateEmployeeName // the employee's id is the condition that lets the table know where to update 
                    ], function (err) {
                        if (err) throw err;
                        console.log(`Employee updated`);
                        init();
                    });
            });
        });
    });
};

//TODO: Refactor all DRY
// Make it so manager can be none