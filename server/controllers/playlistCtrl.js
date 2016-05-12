//server/controllers/playlistCtrl.js

var express = require('express');
var router = express.Router();
var kalturaUtil = require('../util/kalturautil');
var client = kalturaUtil.client;


// Playlist service list action
function playListAction(req,res){

	client.playlist.listAction(function(data){
		kalturaUtil.callbackResult(res,data);
	});

}


module.exports.playListAction = playListAction;