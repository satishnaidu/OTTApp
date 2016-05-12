//server/controllers/mediactrl
var kaltura = require('kaltura');
var async = require('async');
var parser = require('xml2json');
var logger = require('winston');
var kalturautil = require('../util/kalturautil');
var client = require('../util/client');
var client = kalturautil.client;
var fs = require('fs');
var schemas = require('./schemas');

var MediaFeed = schemas.MediaFeed;

function saveMediaFeed(req,res){

	logger.info('save media feed enteterd');

	var message = {
		title:'BABY SWAG ft. Katilete',
		description:'Download baby swag on itunes',
		guid:'kwNpwTX',
		//pubdate:Date.now,
		keywords:'Rap,Music,Video,mom,Moms,mother,maker',
		credit:'The Moms View',
		content:'url,type,duration,medium,content_id',
		thumbnail_url:'http://maker-testthumbnails.s3.website-us-east-1-amazon.jpg'
	};
	//var mediaFeed = new MediaFeed();

	MediaFeed.create(message,function(err,data){
		if(err){
			return kalturautil.callbackResult(res,err);
		}
		kalturautil.callbackResult(res,data);
	});
}

module.exports.saveMediaFeed = saveMediaFeed;

function mediaListACtionCall(callback) {


    var filter = new kaltura.vo.KalturaMediaEntryFilter();
    var pager = new kaltura.vo.KalturaFilterPager();
    client.media.listAction(function(entry) {

        kalturautil.validateRes(entry);
        callback(null, entry);

    }, filter, pager);
}


function metadatListWithMediaIdCall(entry, callback) {

    var mediaResWithMetadatInfo = {};
    var mediaWithMetadataList = [];
    var entryList = entry.objects;
    logger.info("entry list length: " + entryList.length);
    async.each(entryList, function(eachEntry, callback) {

        var filter = new kaltura.vo.KalturaMetadataFilter();


        filter.objectIdEqual = eachEntry.id;
        var pager = new kaltura.vo.KalturaFilterPager();

        client.metadata.listAction(function(metadataList) {
            logger.info('Processing metadata of  ' + eachEntry.id);
            var list = metadataList.objects;

            var options = {
                sanitize: false
            };

            for (var i = 0; i < list.length; i++) {
                var metadata = list[i].xml;
                delete list[i].xml;
                list[i].json = parser.toJson(metadata, options);
            }

            eachEntry.customdata = metadataList;

            mediaWithMetadataList.push(eachEntry);

            callback(null);


        }, filter, pager);

    }, function(err) {
        if (err) {
            logger.error("error");
        }
        logger.info("final response list length " + mediaWithMetadataList.length);
        mediaResWithMetadatInfo.objects = mediaWithMetadataList;
        callback(null, mediaResWithMetadatInfo);
    });

}

function medialistAction(req, res) {

    async.waterfall([
        mediaListACtionCall,
        metadatListWithMediaIdCall,
    ], function(err, result) {
        kalturautil.callbackResult(res, result);
    });

}


module.exports.mediaListAction = medialistAction;



//Kaltura mediaUploadAction
function mediaUploadAction(req, res) {
    console.log("upload service invoked");

    var fileData = req.files;

    console.log("file length: " + fileData.length);

    var file = fileData[0];




    var uploadTokenReq = new kaltura.vo.KalturaUploadToken();
    var filePath = file.path;
    console.log('filepath: ' + filePath);
    uploadTokenReq.fileName = filePath;
    console.log(uploadTokenReq);
    client.uploadToken.add(function(uploadToken) {
        var tokenId = uploadToken.id;
        console.log("uploadToken " + tokenId);
        console.log("new file data");
        console.log("filePath " + filePath);
        client.uploadToken.upload(function(resultToken) {

            if (resultToken && resultToken.code && resultToken.message) {
                console.log('Kaltura Error', resultToken);
                return res.send(resultToken.message);
            }


            console.log("uploaded successfully " + resultToken);
            console.log(resultToken);
            var entry = new kaltura.vo.KalturaMediaEntry();
            entry.name = 'Media entry using AngularJs & NodeJS';
            entry.mediaType = kaltura.kc.enums.KalturaMediaType.VIDEO;
            client.media.add(function(entry) {
                var resource = new kaltura.vo.KalturaUploadedFileTokenResource();

                resource.token = resultToken;
                console.log(resource);


                client.media.addContent(function(entry) {

                    console.log("content added successfully " + entry);
                    callbackResult(res, entry);

                }, entry.id, resource);

            }, entry);

        }, tokenId, filePath, false, false);

    }, uploadTokenReq);



}


function mediaUploadAction2(req, res) {


    var fileData = req.files;

    console.log(fileData);
    console.log("file length: " + fileData.length);

    var file = fileData[0];
    var fileWithPath = file.path;
    console.log(fileWithPath);
    fs.exists(fileWithPath, function(exists) {
        if (exists) {
            fs.readFile(fileWithPath, "utf8", function(error, data) {
                    var uploadToken = null;
                    client.uploadToken.add(function(token) {

                        console.log("upload token added " + JSON.stringify(token));

                        client.uploadToken.upload(function(token) {

                            console.log("upload token uploaded " + JSON.stringify(token));

                            var entry = new kaltura.vo.KalturaMediaEntry();
                            entry.name = "My Video";
                            entry.description = "My video";
                            //entry.userId = userId;
                            //entry.creatorId = userId;
                            entry.type = kaltura.kc.enums.KalturaEntryType.AUTOMATIC;
                            entry.mediaType = kaltura.kc.enums.KalturaMediaType.VIDEO;
                            entry.sourceType = kaltura.kc.enums.KalturaSourceType.FILE;

                            client.media.add(function(result) {

                                console.log("media entry added " + JSON.stringify(result));

                                var resource = new kaltura.vo.KalturaUploadedFileTokenResource();
                                resource.token = token.id;

                                client.media.addContent(function(result2) {

                                    console.log("media entry updated with content " + JSON.stringify(result2));
                                }, result.id, resource);

                            }, entry);

                        }, token.id, fileWithPath);
                    }, uploadToken);
                }


            );
        }
    });
}


module.exports.mediaUploadAction = mediaUploadAction;