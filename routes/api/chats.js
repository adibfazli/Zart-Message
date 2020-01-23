var express = require('express')
var router = express.Router()
const chatCtrl = require('../../controller/chat')

router.use(require("../../config/auth"));
router.get('/findChat/userId/:userId', chatCtrl.findChat);


module.exports = router;