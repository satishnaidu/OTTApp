//server/controllers/reportCtrl.js
var kaltura = require('kaltura');
var kalturautil = require('../util/kalturautil');
var logger = require('winston');
var client = kalturautil.client;


function reportTotal(req,res){

	logger.info("In report total method");
	var reportType = kaltura.kc.enums.KalturaReportType.TOP_CONTENT;
	var reportInputFilter = new kaltura.vo.KalturaEndUserReportInputFilter();
	reportInputFilter.interval = kaltura.kc.enums.KalturaReportInterval.DAYS;
	reportInputFilter.fromDay = "20160101";
	reportInputFilter.toDay = "20160331";
	//reportInputFilter.categories = "MediaSpace";
	var objectIds ='1_q5kcu2f1';

	
	client.report.getTotal(function(data){
		kalturautil.callbackResult(res,data);
	},reportType,reportInputFilter,null);

}

module.exports.reportTotal = reportTotal;


function reportBaseTotal(req,res){

	logger.info("In report base total method");
	var reportType = kaltura.kc.enums.KalturaReportType.TOP_CONTENT;
	var reportInputFilter = new kaltura.vo.KalturaEndUserReportInputFilter();
	reportInputFilter.interval = kaltura.kc.enums.KalturaReportInterval.DAYS;
	reportInputFilter.fromDay = "20160101";
	reportInputFilter.toDay = "20160331";
	//reportInputFilter.categories = "MediaSpace";
	var objectIds ='1_q5kcu2f1';
	client.report.getBaseTotal(function(data){
		kalturautil.callbackResult(res,data);
	},reportType,reportInputFilter,objectIds);

}

module.exports.reportBaseTotal = reportBaseTotal;