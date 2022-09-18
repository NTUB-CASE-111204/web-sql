var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收POST請求
router.post('/', function(req, res, next) {
    var m_email = req.body.m_email;                 //取得帳號
    var m_password = req.body.m_password;     //取得密碼

    member.login(m_email, m_password).then(d => {
        if (d==null){
            req.session.m_email = null;
            req.session.m_password = null;           
            res.render('loginFail');  //傳至登入失敗
        }else{
            req.session.m_email = d.m_email;
            req.session.m_password = d.m_password;
            res.render('memberpage', {m_email:d.m_email});   //導向使用者
        }  
    })
});

module.exports = router;