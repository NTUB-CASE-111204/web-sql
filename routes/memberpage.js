var express = require('express');
var router = express.Router();
/*
//增加引用函式
const member = require('./utility/member');


//接收GET請求
router.get('/:m_email', function(req, res, next) {
  var m_email = req.session.m_email;   //取出參數  activno

  member.one(m_email).then(data => {
      if (data==null){
          res.render('error');  //導向錯誤頁面
      }else if(data==-1){
          res.render('notFound');  //導向找不到頁面                
      }else{
        if (data.m_adopt == true){
          data.m_adopt = "是";
        }else{
          data.m_adopt = "否";
        }
        //data.inventorydate=moment(data.inventorydate).format("YYYY-MM-DD")
        res.render('memberpage', {item:data});  //將資料傳給顯示頁面
      }  
  })
});

module.exports = router;
*/
//接收GET請求
router.get('/', function(req, res, next) {
  var m_email = req.session.m_email;; 

  if(m_email==null || m_email==undefined){
    m_email = '尚未登入';
  }

  res.render('memberpage', { m_email: m_email });
});

module.exports = router;