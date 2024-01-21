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
        message: 'Please enter the name of the department',
        name: 'departmentName'
    },
];

const addRole = [
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
        type: 'list',
        message: 'Which department does the role belong to?',
        choices: [],
        name: 'roleDepartment'
    },
];

const addEmployee = [
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
        message: 'Please enter the employee role',
        name: 'employeeRole'
    },
    {
        type: 'input',
        message: 'Please enter the employee manager',
        name: 'employeeManager'
    },
];

const updateEmployee = [
    {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        choices: [],
        name: 'updateEmployeeName'
    },
    {
        type: 'list',
        message: `Which role do you want to assign to the selected employee?`,
        choices: [],
        name: 'updateEmployeeRole'
    },
]



module.exports = { prompts, addDepartment, addRole, addEmployee};