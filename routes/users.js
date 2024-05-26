const { Router } = require('express');
const logger = require('morgan');
const { addUser, getAllUsers} = require('../clients/users');

const router = new Router();

router.use(logger('dev'));

router.get('/', async function(req, res, next) {
  try {
    const data = await getAllUsers();
    res.send(data);
  } catch (err) {
    console.error(err);
    // Send generic error message and status code
    return res.status(500).json({ error: 'Internal Server Error' });
  }
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
