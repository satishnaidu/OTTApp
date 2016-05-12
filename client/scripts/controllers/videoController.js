'use strict';

/**
 * @ngdoc function
 * @name OTTApp.controller:videoController
 * @description
 * # videoController
 * Controller of the OTTApp
 */
angular.module('OTTApp')
  .controller('videoController', function ($scope, $routeParams) {

  	console.log('In videoController');
  	$("#keyboard").hide();
  	$(".b40").addClass("selected");
  	var videoId = $routeParams.videoId;

  	//***************** Kaltura Player implenetation *********************//

  	kWidget.embed({
		'targetId': 'kaltura_player',
		'wid': '_2076131',
		'uiconf_id' : '33696942',
		'entry_id' : videoId,
 
		// Plugin configuration / flashvars go here 
		'flashvars':{
			'autoPlay' : true, 
			"keyboardShortcuts": {
				"plugin" : true,
				"volumePercentChange" : "0.1",
				"shortSeekTime" : "5",
				"longSeekTime" : "10",
				"volumeUpKey" : "38",
				"volumeDownKey" : "40",
				"togglePlaybackKey" : "32",
				"shortSeekBackKey" : "37",
				"shortSeekForwardKey" : "39",
				"openFullscreenKey" : "70",
				"closeFullscreenkey" : "27",
				"gotoBeginingKey" : "36",
				"gotoEndKey" : "35",
				"longSeekForwardKey" : "ctrl+39",
				"longSeekBackKey" : "ctrl+37",
				"percentageSeekKeys" : "49,50,51,52,53,54,55,56,57"
			}
		},
		
		// Ready callback is issued for this player:
		'readyCallback': function( playerId ){

			console.log( "kWidget player ready: " + playerId );
			//var kdp = $( '#' + playerId );
			var kdp = document.getElementById(playerId);
			kdp.kBind( 'doPlay', function(){
				console.log(  "doPlay called on  " + playerId );
			});
		}
	});


});
