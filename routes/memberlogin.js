var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

const formatDate = (current_datetime)=>{
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
    return formatted_date;
  }

//接收POST請求
router.post('/', function(req, res, next) {
    var m_email = req.body.m_email;                 //取得帳號
    var m_password = req.body.m_password;     //取得密碼
    var callback = req.body.callback;                 //取得帳號
    console.log(callback);
    if (callback==""){
        res.render('loginFail');  //傳至登入失敗
        }
        else{
        //captcha
        member.login(m_email, m_password).then(d => {
            if (d==null){
                req.session.m_email = null;
                req.session.m_password = null;           
                res.render('loginFail');  //傳至登入失敗
            }else if(d.admin==true){
                req.session.m_email = d.m_email;
                req.session.m_password = d.m_password;
                if(d.m_birth == null || d.m_birth == ''){
                    d.m_birth = "尚未填寫"
                }else{
                    d.m_birth = formatDate(d.m_birth)
                }
                if(d.m_phone == null || d.m_phone == ''){
                    d.m_phone = "尚未填寫"
                }
                res.render('empindex', {item:d});     //導向使用者
            }else{
                req.session.m_email = d.m_email;
                req.session.m_password = d.m_password;
                if (d.m_pic == null || d.m_pic == ''){
                    d.m_pic = "icon-07.png";
                }
                if(d.m_birth == null || d.m_birth == ''){
                    d.m_birth = "尚未填寫"
                }else{
                    d.m_birth = formatDate(d.m_birth)
                }
                if(d.m_phone == null || d.m_phone == ''){
                    d.m_phone = "尚未填寫"
                }
                res.render('memberpage', {item:d});     //導向使用者
                callback == ""
            }  
        })
    
});

module.exports = router;