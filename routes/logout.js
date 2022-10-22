var express = require('express');
var router = express.Router();

//增加引用函式
//const member = require('./utility/member');

//接收POST請求
router.get('/', function(req, res, next) {
    req.session.m_email = null;
    req.session.m_password = null;           
    res.render('index');  //傳至登出    
});

module.exports = router;