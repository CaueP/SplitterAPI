/*eslint-env node*/

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var fs = require('fs');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// morgan for logging http requests
var morgan = require('morgan'); 

// package to parse the body of a request into a JSON object
var bodyParser = require('body-parser');

// configuring the MySQL DB
var mysql = require('mysql');

var mySqlDB; 

var dbCredentials = {
    dbName: 'splitterdb'
};

// create a new express server
var app = express();

app.use(morgan('dev'));

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

function getDBCredentialsUrl(jsonData) {
    var vcapServices = JSON.parse(jsonData);
    // Pattern match to find the first instance of a ClearDB (MySQL) service in
    // VCAP_SERVICES. If you know your service key, you can access the
    // service credentials directly by using the vcapServices object.
    for (var vcapService in vcapServices) {
        if (vcapService.match(/cleardb/i)) {
            return vcapServices[vcapService][0].credentials.uri;
        }
    }
}

function initDBConnection() {
    //When running on Bluemix, this variable will be set to a json object
    //containing all the service credentials of all the bound services
    if (process.env.VCAP_SERVICES) {
        dbCredentials.uri = getDBCredentialsUrl(process.env.VCAP_SERVICES);
        console.log("Conectando ao DB na nuvem");
    } else { //When running locally, the VCAP_SERVICES will not be set

        // When running this app locally you can get your MySQL credentials
        // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
        // Variables section for an app in the Bluemix console dashboard).
        // Once you have the credentials, paste them into a file called vcap-local.json.
        // Alternately you could point to a local database here instead of a
        // Bluemix service.
        // uri will be in this format: mysql://root:@localhost:3306/splitterdb?reconnect=true
        dbCredentials.uri = getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
        console.log("Conectando ao DB local");
    }

    mySqlDB = mysql.createPool(dbCredentials.uri);
}

initDBConnection();

// importing routes
// passing mySqlPool connection
var userRouter = require('./src/routes/userRoutes.js')(mySqlDB);
var checkinRouter = require('./src/routes/checkinRoutes')(mySqlDB);
var cardapioRouter = require('./src/routes/cardapioRoutes')(mySqlDB);

// setting the views directory
app.set('views', './src/views');
// setting ejs as the view engine
app.set('view engine', 'ejs');

// using the routes
app.use('/api/usuario', userRouter);
app.use('/api/checkin', checkinRouter);
app.use('/api/cardapio', cardapioRouter);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

// exporting app to be executed on supertest
module.exports = app;