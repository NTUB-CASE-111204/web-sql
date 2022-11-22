var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.get('/', function (req, res, next) {
  member.list().then(data => {
    if (data == null) {
      res.render('error');  //導向錯誤頁面
    } else if (data.length > 0) {
      console.log(data.m_birth);
      for (i = 0; i < data.length; i++) {
        if (data[i].m_birth != null) {
          data[i].m_birth = data[i].m_birth.getFullYear() + "-" + (data[i].m_birth.getMonth() + 1) + "-" + data[i].m_birth.getDate();
        }
      }
      res.render('memberadmin', { items: data });  //將資料傳給顯示頁面
    } else {
      res.render('empaddnotfound');  //導向找不到頁面
    }
  })
});

module.exports = router;