var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收POST請求
router.post('/', function (req, res, next) {
  var m_pic = req.body.m_pic;   //取得會員帳號

  var newData = {
    m_email: req.body.m_email,  
    m_password: req.body.m_password,  
    m_nickname: req.body.m_nickname, 
    m_sex: req.body.m_sex,
    m_birth: req.body.m_birth,
    m_phone: req.body.m_phone,
    m_pic: m_pic,
  }

  member.update(newData).then(d => {
    if (d >= 0) {
      res.render('updateSuccess', { result: d });  //傳至成功頁面
    } else {
      res.render('updateFail');     //導向錯誤頁面
    }
  })
});

//匯出
module.exports = router;