//server/route/playlistRoute.js

var express = require('express');
var router = express.Router();

var playlistCtrl = require('../controllers/playlistCtrl');


router.get('/list',playlistCtrl.playListAction);

module.exports= router;



