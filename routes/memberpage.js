var express = require('express');
var router = express.Router();

const member = require('./utility/member');

const formatDate = (current_datetime) => {
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
  return formatted_date;
}

//接收GET請求
router.get('/', function (req, res, next) {
  var m_email = req.session.m_email;

  if (m_email == null || m_email == undefined) {
    res.render('login');
  }

  member.query(m_email).then(data => {
    if (data == null) {
      res.render('error');  //導向錯誤頁面
    } else if (data == -1) {
      res.render('login');  //導向登入頁面                
    } else {
      if (data.m_pic == null || data.m_pic == '') {
        data.m_pic = "icon-07.png";
      }
      if (data.m_birth == null || data.m_birth == '') {
        data.m_birth = "尚未填寫"
      } else {
        data.m_birth = formatDate(data.m_birth)
      }
      if (data.m_phone == null || data.m_phone == '') {
        data.m_phone = "尚未填寫"
      }
      console.log(data.m_pic);
      res.render('memberpage', { item: data });  //將資料傳給顯示頁面
    }
  })
});

module.exports = router;