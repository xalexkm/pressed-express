const express = require('express');
const pool = require('../client.js');
const logger = require('morgan');

const router = express.Router();

router.use(logger('dev'));

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

router.get('/', async function(req, res, next) {
  const data = await getAllUsers();
  res.send(data);
});

router.put('/', async function(req, res, next) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    await addUser(name, email);

    return res.status(200).json({
      name,
      email,
    });
  } catch (err) {
    console.error(err);
    // Send generic error message and status code
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
