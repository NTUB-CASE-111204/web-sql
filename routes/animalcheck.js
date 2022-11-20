var express = require('express');
var router = express.Router();

const animal = require('./utility/animal');

const formatDate = (current_datetime) => {
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
  return formatted_date;
}

//接收GET請求
router.get('/', function (req, res, next) {
  var an_id = req.session.an_id;

  animal.list(an_id).then(data => {
    if (data == null) {
      res.render('error');  //導向錯誤頁面           
    } else {
      
      console.log(data.an_pic);
      res.render('animalcheck', { item: data });  //將資料傳給顯示頁面
    }
  })
});

module.exports = router;