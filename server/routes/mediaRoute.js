// server/routes/mediaRoute.js

var express = require('express');
var multer = require('multer');
var mediaCtrl = require('../controllers/mediaCtrl');


var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.originalname)
        }
});

var upload = multer({ storage: storage })

//var upload = multer({dest:'./uploads'});

var router = express.Router();

router.get('/list',mediaCtrl.saveMediaFeed);

router.post('/upload',upload.array('files'), mediaCtrl.mediaUploadAction);

module.exports = router;