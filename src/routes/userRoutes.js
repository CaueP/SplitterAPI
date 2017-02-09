var express = require('express');

//Database test
var mysql = require('mysql');
//var db = require('node-mysql');
//var DB = db.DB;
//var BaseRow = db.Row;
//var BaseTable = db.Table;

// mysql connection configuration
var connection = mysql.createConnection({
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
            // connect to db
            connection.connect(function(err){
                if(!err) {
                    console.log("Database is connected...");    
                    // Query database
                    connection.query('SELECT * from tb_cliente', function(err, rows, fields) {
                        connection.end();
                        if (!err) {
                            console.log('The solution is: ', rows);
                            res.send(rows);
                        } else
                            console.log('Error while performing Query.');
                    });
                } else {
                    console.log("Error connecting database ... nn");
                }
            });

        });

    return dbRouter;
};

// exporting the user router
module.exports = router;