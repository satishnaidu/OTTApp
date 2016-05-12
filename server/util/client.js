var kaltura = require('kaltura');
var logger = require('winston');

function initClient() {
	logger.info('Initializing client');
	var config = kaltura.config;
	var clientConfig = new kaltura.kc.KalturaConfiguration(config.partner_id);
	var client = new kaltura.kc.KalturaClient(clientConfig);
	var type = kaltura.kc.enums.KalturaSessionType.ADMIN;

	clientConfig.serviceUrl = config.service_url;

	var expiry = null;
	var privileges = null;
	var ks = client.session.start(function(ks) {
	    	client.setKs(ks);
		    logger.info(ks);
		   },config.admin_secret , config.user_Id, type, config.partner_id, expiry, privileges);
	
	return client;
}

module.exports = initClient;