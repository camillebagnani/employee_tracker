const prompts = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
        name: 'choice',
    },
];

const addDepartment = [
    {
        type: 'input',
        message: 'Please enter the department ID',
        name: 'departmentID'
    },
    {
        type: 'input',
        message: 'Please enter the department name',
        name: 'departmentName'
    },
];

const addRole = [
    {
        type: 'input',
        message: 'Please enter the role ID',
        name: 'roleID'
    },
    {
        type: 'input',
        message: 'Please enter the role title',
        name: 'roleTitle'
    },
    {
        type: 'input',
        message: 'Please enter the role salary',
        name: 'roleSalary'
    },
    {
        type: 'input',
        message: 'Please enter the department id',
        name: 'departmentID'
    },
];

const addEmployee = [
    {
        type: 'input',
        message: 'Please enter the employee ID',
        name: 'employeeID'
    },
    {
        type: 'input',
        message: 'Please enter the employee first name',
        name: 'employeeFirst'
    },
    {
        type: 'input',
        message: 'Please enter the employee last name',
        name: 'employeeLast'
    },
    {
        type: 'input',
        message: 'Please enter the role id',
        name: 'roleID'
    },
    {
        type: 'input',
        message: 'Please enter the manager id',
        name: 'managerID'
    },
]

module.exports = { prompts, addDepartment, addRole, addEmployee};