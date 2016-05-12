var express = require('express');
var bodyParser = require('body-parser');
var busboy = require('busboy');
var request = require('request');
var app = express();

var Kaltura = require('./node_modules/kaltura/KalturaClient.js');
var config = new Kaltura.KalturaConfiguration(2076131);
config.serviceUrl = "https://www.kaltura.com/";
var client = new Kaltura.KalturaClient(config);
var sessionID = null;
client.session.start(function(ks) {
  if (ks.code && ks.message) {
    console.log('Error starting session', success, ks);
  } else {
    sessionID = ks;
    client.setKs(ks);
  }
}, "45963828d9a063db717657b32705d601",
"satish.andey@cognizant.com",
Kaltura.enums.KalturaSessionType.ADMIN,
2076131)

app.use(function(req, res, next) {
  res.locals = {
    ks: sessionID,
  }
  next();
})

app.use('/', express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
})

app.post('/CreateMediaEntry', function(req, res) {
  var entry = new Kaltura.objects.KalturaMediaEntry();
  entry.name = req.body.name;
  entry.mediaType = 1;
  client.media.add(function(entry) {
    var mediaResource = new Kaltura.objects.KalturaUploadedFileTokenResource();
    mediaResource.token = req.body.uploadTokenId;
    var checkStatus = function(entry) {
      if (entry.status === 2) {
        res.render('KalturaMediaEntry', {request: req.body, result: entry})
      } else {
        setTimeout(function() {
          client.media.get(checkStatus, entry.id);
        }, 100);
      }
    }
    client.media.addContent(checkStatus, entry.id, mediaResource);
  }, entry);
});

app.post('/UploadFile', function(req, res) {
  req.body = req.body || {};
  var bus = new busboy({headers: req.headers});
  var dest = null;
  bus.on('file', function(field, file, filename) {
    dest = __dirname + '/' + filename;
    file.pipe(require('fs').createWriteStream(dest));
  });
  bus.on('field', function(field, value) {
    req.body[field] = value;
  });
  bus.on('finish', function() {
    var uploadToken = new Kaltura.objects.KalturaUploadToken();
    client.uploadToken.add(function(result) {
      var tokenId = result.id;
      client.uploadToken.upload(function(result) {
        res.render('UploadDone', {request: req.body, result: result})
      }, tokenId, dest);
    }, uploadToken)
  });
  req.pipe(bus);
});

app.listen(process.env.PORT || 3333);
