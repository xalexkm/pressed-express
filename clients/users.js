const pool = require("../client");

async function getAllUsers() {
    try {
        const connection = await pool();
        const [res,] = await connection.query('SELECT * FROM `users`');
        return res;
    } catch (err) {
        console.error(err);
    }
}

async function addUser(name, email) {
    try {
        const connection = await pool();
        const [res,] = await connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        return res;
    } catch (err) {
        console.error(err);
    }
}

module.exports = { getAllUsers, addUser }