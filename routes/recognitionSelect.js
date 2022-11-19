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
        cb(null, 'public/selectPic');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now()+"--"+file.originalname);    
    }   
})

// 產生multer的上傳物件
var maxSize=1024*1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
    storage:storage
})
//---------------------------

//接收POST請求
router.post('/', upload.single('pic_file'), function (req, res, next) {
  // 如果有選擇圖片
  if (typeof req.file != 'undefined'){
    // 傳入檔案不可超過maxSize
    if(req.file.size > maxSize){
        res.render('fileSizeError');  //圖片過大
        return;
    }                      
  } 

  var pic_file;

  // 如果有選擇圖片
  if (typeof(req.file) != 'undefined'){
    pic_file=req.file.filename;   //取得上傳照片名稱
  }

  // 建立一個新資料物件
  var newData = {
    pic_file:pic_file
  }

  console.log("2/" + pic_file);
  /*member.add(newData).then(d => {
    console.log("3/" + d);
    if (d == 0) {
      res.render('addSuccess');  //傳至成功頁面
    } else {
      res.render('addFail');     //導向錯誤頁面
    }
  })*/
});
module.exports = router;