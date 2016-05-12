//server/controllers/statsCtrl.js

var kaltura = require('kaltura');
var kalturauitl = require('../util/kalturautil');
var logger = require('winston');
var client = kalturauitl.client;


function statsCollect(req,res){


	var kalturaStatsEvent = new kaltura.vo.KalturaStatsEvent();
	kalturaStatsEvent.eventType = kaltura.kc.enums.KalturaStatsEventType.WIDGET_LOADED;

	client.stats.collect(function(data){

		kalturauitl.callbackResult(res,data);
	},kalturaStatsEvent)
}

module.exports.statsCollect = statsCollect;


function statsKmcCollect(req,res){
	logger.info("In stats kmc collect");
	var kalturaStatsKmcEvent = new kaltura.vo.KalturaStatsKmcEvent();

	client.stats.collect(function(data){

		logger.info('data is:');
		logger.info(data);
		kalturauitl.callbackResult(res,data);

	},kalturaStatsKmcEvent);

}

module.exports.statsKmcCollect = statsKmcCollect;