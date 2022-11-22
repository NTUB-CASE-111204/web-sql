var express = require('express');
var router = express.Router();

const member = require('./utility/member');

/* GET home page. */
router.get('/', function(req, res, next) {
  var m_email = req.session.m_email;

  if (m_email == null || m_email == undefined) {
    res.render('login');
  }

  member.query(m_email).then(data => {
    if (data == null) {
      res.render('error');  //導向錯誤頁面
    } else if (data == -1) {
      res.render('login');  //導向登入頁面                
    } else if (data.admin == true){
      res.render('empindex', { item: data });  //將資料傳給顯示頁面
    }else{
      res.render('index', { item: data });
    }
  }) 
});

module.exports = router;