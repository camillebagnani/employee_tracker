const inquirer = require('inquirer');

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
    .then(({choice}) => {
        if(choice === 'View All Departments') {
            console.log('Test!')
        } else if (choice === 'View All Roles') {

        } else if (choice === 'View All Employees') {

        } else if (choice === 'Add Department') {
        
        } else if (choice === 'Add Role') {
            
        } else if (choice === 'Add Employee') {

        } else if (choice === 'Update Employee Role') {

        } else {
            console.log('Successfully quit application')
        }
    })
    .catch((error) => {
        console.log(error);
        console.log('Oops! Something went wrong.')
    })
}

init();