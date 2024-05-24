import express from 'express';
import connection from "../client.mjs";

var router = express.Router();

/* GET users listing. */

function getDataFromDb() {
  try {
    const res = connection.query('SELECT * FROM `users`');
    console.log(res);
    return results;
  } catch (err) {
    console.error(err);
  }
}

router.get('/', function(req, res, next) {
  res.send('Nothing');
});

export default router
