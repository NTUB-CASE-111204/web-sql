var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//---------------------------
// 引用multer外掛
//---------------------------
const multer  = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/pic');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now()+"--"+file.originalname);    
    }   
})

// 產生multer的上傳物件
var maxSize = 3 * 1024 * 1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
    storage:storage
})
//---------------------------

//接收POST請求
router.post('/', upload.single('m_pic'), function (req, res, next) {
  // 如果有選擇圖片
  if (typeof req.file != 'undefined'){
    // 傳入檔案不可超過maxSize
    if(req.file.size > maxSize){
        res.render('fileSizeError');  //圖片過大
        return;
    }                      
  } 

  var m_email = req.body.m_email;
  var m_password = req.body.m_password;
  var m_nickname = req.body.m_nickname;
  var m_sex = req.body.m_sex;
  var m_pic;
  var m_birth = req.body.m_birth;
  var m_phone = req.body.m_phone;
  //var m_phone = Number(req.body.m_phone);

  // 如果有選擇圖片
  if (typeof(req.file) != 'undefined'){
    m_pic=req.file.filename;   //取得上傳照片名稱
  }

  // 建立一個新資料物件
  var newData = {
    m_email:m_email,
    m_password:m_password,
    m_nickname:m_nickname,
    m_sex:m_sex,
    m_pic:m_pic,
    m_birth:m_birth,
    m_phone:m_phone
  }

  console.log("2/" + m_pic);
  member.add(newData).then(d => {
    console.log("3/" + d);
    if (d == 0) {
      res.render('addSuccess');  //傳至成功頁面
    } else {
      res.render('addFail');     //導向錯誤頁面
    }
  })
});
module.exports = router;