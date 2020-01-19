var express = require('express')
var router = express.Router()
const usersCtrl = require('../../controller/user');

router.use(require("../../config/auth"));
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.put('/editUser', usersCtrl.editUser)
router.get('/user', usersCtrl.getUser)

module.exports = router;