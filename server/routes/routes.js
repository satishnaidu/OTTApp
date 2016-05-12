// server/routes/index.js
var logger = require('winston');
var express = require('express');
var router = express.Router();
var passport = require('../util/strategy');
//var passport = strategy.passport;



// middleware to use for all requests
router.use(function(req, res, next) {
   logger.info('Middleware for all the requests');
    next(); // make sure we go to the next routes and don't stop here
});

router.use('/media',require('./mediaRoute'));
router.use('/playlist',require('./playlistRoute'));
router.use('/syndication',require('./syndicationRoute'));
router.use('/livestream',require('./livestreamRoute'));
router.use('/metadata',require('./metadataRoute'));
router.use('/report',require('./reportRoute'));
router.use('/stats',require('./statsRoute'));




router.get('/', function(req, res) {
    res.sendfile('./client/index.html');   
});


/*router.post('/signup',passport.authenticate('signup', { 
	successRedirect: '/api/profile',
	failureRedirect: 'api/login',
	failureFlash : true
}));
  */

/*router.post('/login',passport.authenticate('login',{
	successRedirect:'/profile',
	failureRedirect:'/api/login',
	failureFlash:true,
	failureMessage: "Invalid username or password" 
}));*/

router.post('/login', function(req, res, next) {
  passport.authenticate('login', function(err, user, info) {

  	console.log("authentication failed");
  	console.log(err);
    if (err) {
    return next(err); 
  }
  console.log(user);
  if (user === false) {
    return res.status(401).send(req.flash('loginMessage'));  
  } else {
    return res.status(200).send("success!"); 
  }
})(req, res, next); 
});


router.post('/signup', function(req, res, next) {
  passport.authenticate('signup', function(err, user, info) {

  	console.log("signup authentication failed");
  	console.log(err);
    if (err) {
    return next(err); 
  }
  console.log(user);
  if (user === false) {
    return res.status(401).send(req.flash('loginMessage'));  
  } else {
   	return res.status(200).send("success!"); 
  }
})(req, res, next); 
});



router.get('/login',function(req,res){
	res.sendfile('./client/views/login.html');
});

router.get('/signup',function(req,res){
	//res.render('./client/signup.html',{message:req.flash('signupmessage')});
	console.log("signup called");
	res.sendfile('./client/views/signup.html');
});

router.get('/profile',isLoggedIn, function(req,res){
	res.sendfile('./client/index.html',{
		user:req.user
	});
});

router.get('/logout',function(req,res){
	req.logout();
	req.redirect('/');
});


function isLoggedIn(req,res,next){
	if(req.isAuthenticated){
		return next();
	}
	res.redirect('/');
}


module.exports = router;