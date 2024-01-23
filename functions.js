const inquirer = require('inquirer');
const mysql = require('mysql2');

// Store SQL connection in a variable called 'db'
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'employees_db'
    }
);

const runInquirer = (questionArray, query, nameData, message, callback) => {
    inquirer.prompt(questionArray).then((answers) => {
        db.query(query, {
            name: answers[nameData], // Concatenates answers from questionArray with the name of the Inquirer question
        }, function (err) {
            if (err) throw err;
            console.log(`${message}`);
            // Allows the init() function to be called in index.js
            if(callback) {
                callback();
            }
        });
    });
};

module.exports = {runInquirer}