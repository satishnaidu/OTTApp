//client/models/user.js

//load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
	
	 _id: Schema.ObjectId,
	local:{
		email: {type: String, required: true},
		password:{type:String}
	},
	facebook:{
		id:String,
		token:String,
		email:String,
		name:String
	},
	twitter:{
		id:String,
		token:String,
		displayName:String,
		username:String
	},
	google:{
		id:String,
		token:String,
		email:String,
		name:String
	}
	},
	{
      collection: 'user'
 });

//Method to generate the hash.
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User',userSchema);

module.exports = User;