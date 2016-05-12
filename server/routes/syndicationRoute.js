//server/route/playlistRoute.js

var express = require('express');
var router = express.Router();

var syndicationCtrl = require('../controllers/syndicationCtrl');

router.get('/list',syndicationCtrl.syndicationFeedListAction);

module.exports = router;



