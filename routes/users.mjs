import express from 'express';
import connection from "../client.mjs";
import logger from "morgan";
import app from "../app.mjs";

var router = express.Router();

router.use(logger('dev'));

/* GET users listing. */

async function getAllUsers() {
  try {
    const [res, col] = await connection.query('SELECT * FROM `users`');
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
}

router.get('/', async function(req, res, next) {
  const data = await getAllUsers();
  res.send(data);
});

router.put('/', async function() {
})

export default router
