//server/routes/statsRoute.js

var express = require('express');
var statsRouter = express.Router();

var statsCtrl = require('../controllers/statsCtrl');

statsRouter.get('/collect',statsCtrl.statsCollect);

statsRouter.get('/kmccollect',statsCtrl.statsKmcCollect);

module.exports = statsRouter;