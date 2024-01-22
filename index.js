const inquirer = require('inquirer');
const mysql = require('mysql2');
const { prompts, addDepartmentArray, addRoleArray, addEmployeeArray, updateEmployeeArray } = require('./arrays')

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'employees_db'
    }
);

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

const viewDatabase = (query) => {
    db.connect(function (err) {
        if (err) throw err;
        db.query(query, function (err, results) {
            if (err) throw err;
            console.table(results);
            init();
        });
    });
};

const addDepartment = () => {
    inquirer.prompt(addDepartmentArray).then((answers) => {
        db.query("INSERT INTO department SET ?", {
            name: answers.departmentName,
        }, function (err) {
            if (err) throw err;
            console.log("Department added");
            init();
        });
    });
};

const addRole = () => {
    db.query("SELECT id, name FROM department", function (err, results) {
        if (err) throw err;

        const existingDepartments = results.map(department => ({
            value: department.id,
            name: department.name
        }));

        const roleDepartmentQuestion = addRoleArray.find(question => question.name === 'roleDepartment');

        if (roleDepartmentQuestion && roleDepartmentQuestion.type === 'list') {
            roleDepartmentQuestion.choices = existingDepartments;
        } else {
            console.error("Oops! Error occured when updating choices for role department");
        };

        inquirer.prompt(addRoleArray).then((answers) => {
            db.query("INSERT INTO role SET ?", {
                title: answers.roleTitle,
                salary: answers.roleSalary,
                department_id: answers.roleDepartment
            }, function (err) {
                if (err) throw err;
                console.log("Role added");
                init();
            });
        });
    });
};

const addEmployee = () => {
    db.query("SELECT id, title FROM role", function (err, results) {
        if (err) throw err;
        const existingRoles = results.map(role => ({
            value: role.id,
            name: role.title
        }));

        const employeeRoleQuestion = addEmployeeArray.find(question => question.name === 'employeeRole');

        if (employeeRoleQuestion && employeeRoleQuestion.type === 'list') {
            employeeRoleQuestion.choices = existingRoles;
        } else {
            console.error(`Oops! Error occured when updating choices for employee role`)
        };

        db.query("SELECT id, first_name, last_name FROM employee", function (err, results) {
            if (err) throw err;
            const existingEmployees = results.map(employee => ({
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            }));

            const employeeManagerQuestion = addEmployeeArray.find(question => question.name === 'employeeManager');

            if (employeeManagerQuestion && employeeManagerQuestion.type === 'list') {
                employeeManagerQuestion.choices = existingEmployees;
            } else {
                console.error(`Oops! Error occured when updating choices for manager`)
            }

            inquirer.prompt(addEmployeeArray).then((answers) => {
                db.query("INSERT INTO employee SET ?", {
                    first_name: answers.employeeFirst,
                    last_name: answers.employeeLast,
                    role_id: answers.employeeRole,
                    manager_id: answers.employeeManager
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
    db.query("SELECT id, first_name, last_name FROM employee", function (err, results) {
        if (err) throw err;
        const existingEmployees = results.map(employee => ({
            value: employee.id,
            name: `${employee.first_name} ${employee.last_name}`
        }));

        const updatedEmployeeQuestion = updateEmployeeArray.find(question => question.name === 'updateEmployeeName');

        if (updatedEmployeeQuestion && updatedEmployeeQuestion.type === 'list') {
            updatedEmployeeQuestion.choices = existingEmployees;
        } else {
            console.error(`Oops! Error occured when displaying employees`)
        };

        db.query("SELECT id, title FROM role", function (err, results) {
            if (err) throw err;
            const existingRoles = results.map(role => ({
                value: role.id,
                name: role.title
            }));

            const updatedRoleQuestion = updateEmployeeArray.find(question => question.name === 'updateEmployeeRole');

            if (updatedRoleQuestion && updatedRoleQuestion.type === 'list') {
                updatedRoleQuestion.choices = existingRoles;
            } else {
                console.error(`Oops! Error occured when updating choices for employee role`)
            }
        });

        inquirer.prompt(updateEmployeeArray).then((answers) => {
            db.query("UPDATE employee SET first_name = ?, last_name = ?, role_id = ? WHERE id = ?",
                [answers.employeeFirst,
                answers.employeeLast,
                answers.employeeRole,
                answers.updateEmployeeName
                ], function (err) {
                    if (err) throw err;
                    console.log(`Employee updated`);
                    init();
                });
        });
    });
};

//TOD: Refactor all DRY
// Make it so manager can be none