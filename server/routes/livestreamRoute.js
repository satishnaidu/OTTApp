//server/routes/livestreamRoute.js

var express = require('express')
var livestreamCtrl = require('../controllers/livestreamCtrl');

var router = express.Router();


router.get('/list',livestreamCtrl.livestreamListAction);

module.exports = router;