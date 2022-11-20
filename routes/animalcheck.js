var express = require('express');
var router = express.Router();

const animal = require('./utility/animal');


//接收GET請求
router.get('/', function (req, res, next) {
  var an_id = req.query.an_id;
  console.log(an_id);
  animal.query(an_id).then(data => {
    if (data == null) {
      res.render('error');  //導向錯誤頁面           
    } else {
      if (data.an_postdate != null) {
        data.an_postdate = data.an_postdate.getFullYear() + "-" + (data.an_postdate.getMonth() + 1) + "-" + data.an_postdate.getDate();
      }
      if (data.an_birth != null) {
        data.an_birth = data.an_birth.getFullYear() + "-" + (data.an_birth.getMonth() + 1) + "-" + data.an_birth.getDate();
      }
      if (data.an_pic != null) {
        data.an_pic = "animalpic/" + data.an_pic;
      }
      res.render('animalcheck', { item: data });  //將資料傳給顯示頁面
    }
  })
});

module.exports = router;