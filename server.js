// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
// for readign .env file
require('dotenv').config();

//ADDING OUR ROUTES
const testroute = require('./routes/TestRoute');
const bearroute = require ('./routes/BearRoute');

// configure app
app.use(morgan('dev')); // log requests to the console

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

//PORT ASSIGNMENT
var port  = config.server.port || 9191;  // set our port

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.db); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// create our router
var router = express.Router();

// ROUTES FOR OUR API
// =============================================================================
app.use('/testRoute',testroute);
app.use('/bear',bearroute)

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});


// REGISTER OUR ROUTES -------------------------------
app.use('/alive', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
