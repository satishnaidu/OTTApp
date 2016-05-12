//server/util/strategy.js

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

passport.serializeUser(function(user,done){
	done(null,user._id);
});

passport.deserializeUser(function(user,done){
	 User.findById(user.id, function(err, user) {
            done(err, user);
        });
});

passport.use('login',new LocalStrategy({
	usernameField:'email',
	passwordField:'password',
	passReqToCallback:true
},
 function(req,email,password,done){

 	process.nextTick(function(){
 		console.log("Processing next tick");

 		User.findOne({'email':email},
 		function(err,user){
 			if(err){
 				return done(err);
 			}
 			console.log("user details:");
 			console.log(user);
 			 // if no user is found, return the message
            if (!user)
            	console.log("user doest exist");
                return done(null, false, req.flash('loginMessage', 'No user found.'));

 			  // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

             // all is well, return successful user
            return done(null, user);
 		})
 	})
 }))


passport.use('signup',new LocalStrategy({
	usernameField:'email',
	passwordField:'password',
	passReqToCallback : true
},
 function(req,email,password,done){

 process.nextTick(function() {


 	User.findOne({'email':email},
 		function(err,user){
 			if(err){
 				return done(errr);
 			}
 			if(user){
 				 console.log('User already exists with username: '+username);
                 return done(null, false, req.flash('message','User Already Exists'));
 			}else{
 				var newUser = new User();
 				newUser.local.email = email;
 				newUser.local.password = newUser.generateHash(password);

 				newUser.save(function(err){
 					if(err){
 						throw err;
 					}
 					return done(null,newUser);
 				});
 			}
  		});
 	});

 }
));




module.exports = passport;