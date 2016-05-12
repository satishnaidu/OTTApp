//server/controllers/playlistCtrl.js

var kalturautil = require('../util/kalturautil');
var client = kalturautil.client;

function syndicationFeedListAction(req,res){

	client.syndicationFeed.listAction(function(data){

		kalturautil.callbackResult(res,data);
	});
}


module.exports.syndicationFeedListAction = syndicationFeedListAction;