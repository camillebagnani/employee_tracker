const inquirer = require('inquirer');
const mysql = require('mysql2');
const { prompts, addDepartment, addRole, addEmployee } = require('./arrays')

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

                addToDepartment();

            } else if (choice === 'Add Role') {

                addToRole();

            } else if (choice === 'Add Employee') {

                addToDatabase(addEmployee, "SELECT * FROM department");

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

const addToDepartment = () => {
    inquirer.prompt(addDepartment).then((answers) => {
        db.query("INSERT INTO department SET ?", {
            name: answers.departmentName,
        }, function (err) {
            if (err) throw err;
            console.log("Department added");
            init();
        });
    });
};

const addToRole = () => {
    db.query("SELECT id, name FROM department", function (err, results) {
        if (err) throw err;

        const existingDepartments = results.map(department => ({
            value: department.id,
            name: department.name
        }));

        const roleDepartmentQuestion = addRole.find(question => question.name === 'roleDepartment');

        if (roleDepartmentQuestion && roleDepartmentQuestion.type === 'list') {
            roleDepartmentQuestion.choices = existingDepartments;
        } else {
            console.error("Oops! Error occured when updating choices for role department");
        };

        inquirer.prompt(addRole).then((answers) => {
            // const selectedDepartmentId = parseInt(answers.roleDepartment);
            // const selectedDepartment = existingDepartments.find(department => department.id === answers.roleDepartment);
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

// const addToDatabase = (addingArray, query) => {
//     inquirer.prompt(addingArray)
//         .then((answers) => {
//             db.connect(function (err) {
//                 if (err) throw err;
//                 db.query(query, function (err, results) {
//                     if (err) throw err;
//                     console.log(`Added`);
//                     init();
//                 });
//             });
//         });
// };

    // inquirer.prompt(addDepartment)
                // .then(() => {
                //     const query = `INSERT INTO department (id, name) VALUES (?)`
                //     const params = [addDepartment.departmentName];

                //     db.query(query, params, (err, result) => {
                //             if (err) throw err;
                //             console.log(`Added`);
                //             init();
                //           });
                //     });

                // addToDatabase(addDepartment, `"INSERT INTO department (id, name) VALUES ('7', '${addDepartment.departmentName}')";`);


// TO DO: validate department name and make this department id equal the real department id

