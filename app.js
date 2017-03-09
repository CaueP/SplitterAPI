/*eslint-env node*/

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// package to parse the body of a request into a JSON object
var bodyParser = require('body-parser');

// configuring the MySQL DB
var mysql = require('mysql');

// mysql pool connection configuration
// var mySqlPool = mysql.createPool({
//   host: 'us-cdbr-iron-east-03.cleardb.net',
//   user: 'bf581ab6083cb1',
//   password: '1979175d',
//   database: 'ad_2f6fb0f5141bb38',
//   connectionLimit: 4  
// });

// local config
var mySqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'splitterdb',
  connectionLimit: 4  
});

// create a new express server
var app = express();

// importing routes
// passing mySqlPool connection
var userRouter = require('./src/routes/userRoutes.js')(mySqlPool);

/*
    setting up the middleware
*/

// setting the public directory for static files
app.use(express.static('public'));

// parse application/json (parse the body into req.body for json encoded)
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded (parse the body into req.body for url encoded)
app.use(bodyParser.urlencoded({extended: false}));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// setting the views directory
app.set('views', './src/views');
// setting ejs as the view engine
app.set('view engine', 'ejs');

// using the routes
app.use('/api/usuario', userRouter);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
