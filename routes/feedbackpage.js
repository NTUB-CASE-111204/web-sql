var express = require('express');
var router = express.Router();

//增加引用函式
const feedback = require('./utility/feedback');

//接收GET請求
router.get('/', function (req, res, next) {
  feedback.list().then(data => {
    if (data == null) {
      res.render('error');  //導向錯誤頁面
    } else if (data.length > 0) {
      for (i = 0; i < data.length; i++) {
        if (data[i].f_time != null) {
          data[i].f_time = data[i].f_time.getFullYear() + "-" + (data[i].f_time.getMonth() + 1) + "-" + data[i].f_time.getDate() + " " + data[i].f_time.getHours() + ":" + data[i].f_time.getMinutes() + ":" + data[i].f_time.getSeconds() + "." + data[i].f_time.getMilliseconds();
        }
      }
      res.render('feedbackpage', { items: data });  //將資料傳給顯示頁面
    } else {
      res.render('notFound');  //導向找不到頁面
    }
  })
});

module.exports = router;