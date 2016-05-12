//server/routes/metadataRoute.js

var express = require('express');
var metadataCtrl = require('../controllers/metadataCtrl');

var router = express.Router();

router.get('/list',metadataCtrl.metadataListAction);

router.get('/profile/list',metadataCtrl.metadataProfileListAction);

router.get('/profile/fields',metadataCtrl.metadataProfileListFieldsAction);


module.exports = router;