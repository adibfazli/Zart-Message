var express = require('express')
var router = express.Router()
const chatCtrl = require('../../controller/chat')

router.use(require("../../config/auth"));
router.get('/findChat/userId/:userId', chatCtrl.findChat);
router.post('/allChats' , chatCtrl.allChats);


module.exports = router;