import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'mydatabase',
});

export default connection;
