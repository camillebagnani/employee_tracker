// Serves as the main menu when Inquirer is called
const prompts = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
        name: 'choice',
    },
];

// Inquirer questions to add new department
const addDepartmentArray = [
    {
        type: 'input',
        message: 'Please enter the name of the department',
        name: 'departmentName'
    },
];

// Inquirer questions to add new role
const addRoleArray = [
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

// Inquirer questions to add new employee
const addEmployeeArray = [
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
        type: 'list',
        message: `What is the employee's role?`,
        choices: [],
        name: 'employeeRole'
    },
    {
        type: 'list',
        message: `Who is the employee's manager?`,
        choices: [],
        name: 'employeeManager'
    },
];

// Inquirer questions to update an employee's role
const updateEmployeeArray = [
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

module.exports = { prompts, addDepartmentArray, addRoleArray, addEmployeeArray, updateEmployeeArray};