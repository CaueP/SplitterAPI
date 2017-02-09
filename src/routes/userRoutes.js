var express = require('express');

//Database test
var mysql = require('mysql');
//var db = require('node-mysql');
//var DB = db.DB;
//var BaseRow = db.Row;
//var BaseTable = db.Table;

// mysql pool connection configuration
var pool = mysql.createPool({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'b512c6c77f34ed',
  password: 'ce363924',
  database: 'ad_07c2dc0912539d9',
  connectionLimit: 4  
});

var dbRouter = express.Router();

// function router
var router = function() {

    // Setting route for /
    dbRouter.route('/')
    // get method to get all users registered
        .get(function(req, res){

            // Query database (connection implicitly established)

            pool.getConnection(function(err, connection) {
                // Use the connection 
                connection.query('SELECT * from tb_cliente', function(err, results, fields) {
                    // And done with the connection. 
                    connection.release();

                    if (!err) {
                    console.log('The solution is: ', results);
                        res.send(results);
                    } else { // Handle error after the release. 
                        console.log('Error while performing Query.');
                        res.send(err);
                    }
                });
            });

        });

    return dbRouter;
};

// exporting the user router
module.exports = router;