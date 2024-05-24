const mysql = require('mysql2/promise');

const pool = () => mysql.createPool({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'mydatabase',
});

module.exports = pool;
