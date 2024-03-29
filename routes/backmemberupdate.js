var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//---------------------------
// 引用multer外掛
//---------------------------
const multer = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/pic');
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  }
})

// 產生multer的上傳物件
var maxSize = 3 * 1024 * 1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
  storage: storage
})
//---------------------------

//接收POST請求
router.post('/', upload.single('m_pic'), function (req, res, next) {

  var m_email = req.body.m_email;   //取得會員帳號
  var m_pic = req.body.m_pic;
  // 如果有選擇圖片
  if (typeof req.file != 'undefined') {
    // 傳入檔案不可超過maxSize
    if (req.file.size > maxSize) {
      res.render('fileSizeError');  //圖片過大
      return;
    }
  }
  console.log("1///" + m_pic);
  // 如果有選擇圖片
  if (typeof (req.file) != 'undefined') {
    m_pic = req.file.filename;   //取得上傳照片名稱
  }
  console.log("2///" + m_pic);
  var newData = {
    m_email: m_email,
    m_password: req.body.m_password,
    m_nickname: req.body.m_nickname,
    m_sex: req.body.m_sex,
    m_birth: req.body.m_birth,
    m_phone: req.body.m_phone,
    m_pic: m_pic
  }
  console.log("3///" + newData.m_pic);
  member.update(newData).then(d => {
    if (d >= 0) {
      res.render('memberno', { result: d });  //傳至成功頁面
    } else {
      res.render('empupdateFail');     //導向錯誤頁面
    }
  })
});

//匯出
module.exports = router;