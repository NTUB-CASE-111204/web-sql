var express = require('express');
var router = express.Router();

//增加引用函式
const animal = require('./utility/animal');

//---------------------------
// 引用multer外掛
//---------------------------
const multer = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/animalpic');
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  }
})

// 產生multer的上傳物件
var maxSize = 1024 * 1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
  storage: storage
})
//---------------------------

//接收POST請求
router.post('/', upload.single('an_pic'), function (req, res, next) {
  var an_id = req.body.an_id;
  var an_pic = req.body.an_pic;
  // 如果有選擇圖片
  if (typeof req.file != 'undefined') {
    // 傳入檔案不可超過maxSize
    if (req.file.size > maxSize) {
      res.render('fileSizeError');  //圖片過大
      return;
    }
  }
  // 如果有選擇圖片
  if (typeof (req.file) != 'undefined') {
    an_pic = req.file.filename;   //取得上傳照片名稱
  }
  console.log("2///" + an_pic);
  var newData = {
    an_id: an_id,
    an_name: req.body.an_name,
    an_variety: req.body.an_variety,
    an_birth: req.body.an_birth,
    an_size: req.body.an_size,
    an_depiction: req.body.an_depiction,
    an_pic: an_pic,
    an_sex: req.body.an_sex
  }
  console.log("1///" + newData.an_id);
  console.log("3///" + newData.an_pic);
  animal.update(newData).then(d => {
    if (d >= 0) {
      res.render('animalupdateno', { result: d });  //傳至成功頁面
    } else {
      res.render('updateFail');     //導向錯誤頁面
    }
  })
});

//匯出
module.exports = router;