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
  connectionString: conStr
});


router.get('/db', function (request, response) {
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
      {
        console.info(" Printing the client error:" + client);
        client.release();
        console.error(err); response.send("Error " + err);
      } else {
        console.info("Connection is success:")
        response.render('pages/db', {results: result.rows} );
      }
    });
  });
});