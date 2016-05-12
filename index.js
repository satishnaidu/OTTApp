var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var Promise = require("bluebird");
var logger = require('winston');
//var cluster = require('cluster');
var compression = require('compression');
var helmet = require('helmet');
var responseTime = require('response-time');
var csrf = require('csrf');

var routes = require('./server/routes/routes');
var mongoose = require('mongoose');
var config = require('./server/config/config');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');



mongoose.connect(config.mongoose_url);


process.env.NODE_ENV = 'development';


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

var app = express();


app.set('port', (process.env.PORT || 5000));

//Must use as first middleware,except logging
app.use(compression());

app.use(helmet());
app.use(morgan('dev'));
app.use(allowCrossDomain);

//passport middlewares
//express session must be used before passport session
// to ensure login session is restored in correct order.
app.use(expressSession({secret: 'kalturaKey', 
                 saveUninitialized: true,
                 resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(responseTime());
app.use(flash())



 app.use(function(err, req, res, next) {

 		console.log(">>>>>>>>>>>>>>>>>>>");
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
 });

app.use('/api',routes);

/*
if(cluster.isMaster){
    logger.info('Master cluster setting up %s,%s ',numWorkers,' workers...');

     // Keep track of http requests
    var numReqs = 0;
    
    setInterval(() => {
     logger.info('numReqs =', numReqs);
    }, 1000);

  // Count requests
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd == 'notifyRequest') {
      numReqs += 1;
    }
    logger.info("Getting message from process : ", msg.procId);
  }

    var numWorkers = require('os').cpus().length
    
    for(var i=0;i<numWorkers;i++){
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach((id) => {
        cluster.workers[id].on('message', messageHandler);
    });

     cluster.on('online',function(worker){
        logger.info('Worker ' + worker.process.pid + ' is online');
     });

     cluster.on('exit',function(worker){
        logger.info('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
         logger.info('Starting a new worker');
        cluster.fork();
     });

     process.on('message',function(message){
        console.log('master reading mesage :'+message);
     });

     
     //process.send('hello from worker with id: ' + process.pid);


}else{
    app.listen(app.get('port'), function() {
        logger.info('Node app is running on port', app.get('port'));
    });

} */

     app.listen(app.get('port'), function() {
        logger.info('Node app is running on port', app.get('port'));
    });
