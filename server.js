const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log('Connected to the employess_db database.')
);

db.query('SELECT * FROM departments', function (err, results) {
    console.log(results);
});