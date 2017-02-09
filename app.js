/*eslint-env node*/

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// importing routes
// passing nav array of items
var userRouter = require('./src/routes/userRoutes.js')();

/*
    setting up the middleware
*/

// setting the public directory for static files
app.use(express.static('public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// setting the views directory
app.set('views', './src/views');
// setting ejs as the view engine
app.set('view engine', 'ejs');

// using the routes
app.use('/user', userRouter);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
