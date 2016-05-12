
var mongoose = require('mongoose');

var MediaFeedSchema = new mongoose.Schema({
	title:String,
	description:String,
	guid:String,
	pubdate:{type:Date,default:Date.now},
	lastModifiedDate:{type:Date,default:Date.now},
	keywords:String,
	credit:String,
	content:String,
	thumbnail_url:String,

});

var MediaFeed = mongoose.model('MediaFeed',MediaFeedSchema);

module.exports.MediaFeed = MediaFeed;