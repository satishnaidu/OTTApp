//server/routes/reportRoute.js

var express = require('express');
var reportRouter = express.Router();

var reportCtrl = require('../controllers/reportCtrl');


reportRouter.get('/total',reportCtrl.reportTotal);

reportRouter.get('/basetotal',reportCtrl.reportBaseTotal);

module.exports= reportRouter;