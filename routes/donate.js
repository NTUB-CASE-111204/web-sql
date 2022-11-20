var express = require('express');
var router = express.Router();

//增加引用函式
const animal = require('./utility/animal');

//接收GET請求
router.get('/', function (req, res, next) {
  animal.list().then(data => {
    if (data == null) {
      res.render('error');  //導向錯誤頁面
    } else if (data.length > 0) {
      for (i = 0; i < data.length; i++) {
        if (data[i].an_postdate != null) {
          data[i].an_postdate = data[i].an_postdate.getFullYear() + "-" + (data[i].an_postdate.getMonth() + 1) + "-" + data[i].an_postdate.getDate();
        }
      }
      for (i = 0; i < data.length; i++) {
        if (data[i].an_pic != null) {
          data[i].an_pic = "animalpic/" + data[i].an_pic;
        }
      }
      res.render('donate', { items: data });  //將資料傳給顯示頁面
    } else {
      res.render('notFound');  //導向找不到頁面
    }
  })
});

module.exports = router;