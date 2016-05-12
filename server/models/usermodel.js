var mongoose = require('mongoose');


var userSchema = {
	username:String,
	password:String,
	email:String,
	gender:String,
	address:String
};

var User = mongoose.model('User',userSchema);

module.exports.User = User;