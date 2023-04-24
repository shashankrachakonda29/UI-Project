// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

//var mongoose= new mongoosecore();
// Build the connection string
//var dbURI = 'mongodb://127.0.0.1:22711/ameba2'
var dbURI = 'mongodb://127.0.0.1:27017/ameba2';

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  //console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


// BRING IN YOUR SCHEMAS & MODELS
// For example
require('./stores');
require('./user');
require('./activity');
require('./session');
require('./template');
require('./dyndata');
require('./docrunner');
require('./dractivity');
require('./drdoc');
require('./schemes');
require('./fbpartners');
require('./Eccategories');
require('./Ecproducts');
require('./Ecplaylist');
require('./Ecorders');
require('./bulkjobs');
require('./Ecsubscriptions');

require('./fbcontacts');
require('./fbcompany');
require('./fbpartnerleads');
require('./fbpartnersloan');
require('./fbpartnermeeting');
require('./fbpartnertasks');
require('./externalbanks');
require('./fbbankoffers');
require('./fbschemerates');
require('./fbleads');
require('./fbleadslite');
require('./fbconnector');
require('./fbmanufacturer');
require('./fbusers');
require('./fbbuckets');
require('./fbbucketStages');
require('./fbbanker');
require('./fbAssociates');
require('./fbforms');
require('./fbpolicy');
require('./fbsection');
require('./fblinks');
require('./fbroles');
require('./fbloanEmi');
require('./fbteams');
require("./fbnotifications");
require("./fbpartnermailer");
require('./fbpartnertickets');
require('./fbpartnertraining');
require('./fbpartnerexaminer');
require('./fbpartnerbanner');
require('./fbpartnertest');
require('./fbexpenses');
require('./fbotp');
require('./fbdam');
require('./fbflow');
require('./fbassetclass');
require('./fbwarehouse');
require('./fbassettype');
require('./fbassetsubtype');
require('./fbpurchaseorder');
require('./fbescalation');
// added the schema to Database file
require('./shashanktask');


