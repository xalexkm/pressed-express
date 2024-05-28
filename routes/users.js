const { Router } = require('express');
const logger = require('morgan');
const { addUser, getAllUsers} = require('../clients/users');
const {query, validationResult, matchedData, body} = require("express-validator");

const router = new Router();

router.use(logger('dev'));

router.get('/', async function(req, res) {
  try {
    const data = await getAllUsers();
    res.send(data);
  } catch (err) {
    console.error(err);
    // Send generic error message and status code
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/', [body('name').notEmpty(), body('email').notEmpty().isEmail()], async function(req, res) {
  try {
    const validation = validationResult(req);

    if (validation.isEmpty()) {
      const data = matchedData(req);

      const { name, email } = data;

      await addUser(name, email);

      return res.status(200).json({
        name,
        email,
      });
    } else {
      return res.status(400).json({ error: 'Name and email failed to validate. Try different values.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
