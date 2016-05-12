//server/controllers/metadataCtrl.js

var kaltura = require('kaltura');
var parser = require('xml2json');
var kalturautil = require('../util/kalturautil');
var client = kalturautil.client;

function metadataListAction(req,res){

	var entryId = req.query.entryId;

	var filter = new kaltura.vo.KalturaMetadataFilter();
	filter.objectIdEqual= entryId;
	var pager = new kaltura.vo.KalturaFilterPager();
	pager.PageSize = 10;
	pager.PageIndex =1;

	client.metadata.listAction(function(data){

		var list = data.objects;
		console.log(list);
		var options = {
    			sanitize: false
		};
		for(var i=0;i<list.length;i++){

			var metadata = list[i].xml;
			delete list[i].xml;
			//list[i].xml = parser.toJson(metadata);
			list[i].json = parser.toJson(metadata,options);
			
		}
		kalturautil.callbackResult(res,data);
	},filter,pager);
}

module.exports.metadataListAction = metadataListAction;


function metadataProfileListAction(req,res){

	var filter = new kaltura.vo.KalturaMetadataFilter();
	var pager = new kaltura.vo.KalturaFilterPager();
	client.metadataProfile.listAction(function(data){
		kalturautil.callbackResult(res,data);
	},filter,pager);
}

module.exports.metadataProfileListAction = metadataProfileListAction;



function metadataProfileListFieldsAction(req,res){

	var metadataProfileId = req.query.meta_profileid;//6872562;
	
	client.metadataProfile.listFields(function(data){
		kalturautil.callbackResult(res,data);
	},metadataProfileId);
}

module.exports.metadataProfileListFieldsAction = metadataProfileListFieldsAction;