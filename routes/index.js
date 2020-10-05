var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;

const {Pool} = require("pg");
var conStr = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: conStr,
  queueLimit: 0,
  connectionLimit: 0
});


router.get('/db', function (request, response) {
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
      { client.release();
        console.log(client);
        console.error(err); response.send("Error " + err); }
      else
      { response.render('pages/db', {results: result.rows} );
      client.release();
      }
    });
    client.release();
  });
});