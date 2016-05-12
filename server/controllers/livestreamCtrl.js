//server/controllers/livestreamCtrl.js

var kaltura = require('kaltura');
var kalturautil = require('../util/kalturautil');
var client = kalturautil.client;

function livestreamListAction(req,res){

	var filter = new kaltura.vo.KalturaLiveStreamEntryFilter();
	var pager = new kaltura.vo.KalturaFilterPager();

	client.liveStream.listAction(function(data){

		kalturautil.callbackResult(res,data);

	},filter,pager);

}


module.exports.livestreamListAction = livestreamListAction;
