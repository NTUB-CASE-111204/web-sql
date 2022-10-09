var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收POST請求
router.post('/', function (req, res, next) {
  var m_email = req.body.m_email;
  var m_password = req.body.m_password;
  var m_nickname = req.body.m_nickname;
  var m_sex = req.body.m_sex;
  var m_pic = req.body.m_pic;
  var m_birth = req.body.m_birth;
  var m_phone = req.body.m_phone;
  //var m_phone = Number(req.body.m_phone);
  
  console.log("1/" + m_birth);
  // 建立一個新資料物件
  var newData = {
    m_email:m_email,
    m_password:m_password,
    m_nickname:m_nickname,
    m_sex:m_sex,
    m_pic:m_pic,
    m_birth:m_birth,
    m_phone:m_phone
  }

  console.log("2/" + m_email);
  member.add(newData).then(d => {
    console.log("3/" + d);
    if (d == 0) {
      res.render('addSuccess');  //傳至成功頁面
    } else {
      res.render('addFail');     //導向錯誤頁面
    }
  })
});
module.exports = router;