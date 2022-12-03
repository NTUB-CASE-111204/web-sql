var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');
const brand = require('./utility/brandall');

//---------------------------
// 引用multer外掛
//---------------------------
const multer  = require('multer');
const { json } = require('express/lib/response');

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

  while(true){
    //res.render('index');
    /*$.ajax({
      type: "POST",
      url: "/helloWorld.py",
      data: {
        param: "hello world",
      }
    }).done((o) => {
       console.log(o)
    });*/
    var exec = require('child_process').exec;
    var cmds = ['100', '200', '300', pic_file];
    var no = 0;

    //先發第一個環節碼100，等待返回正確資料再進行傳送下一個碼
    execCmd();

    //該方法用於命令列執行python命令 類似於:  python py_test.py arg1
    //這樣在python中就可以接受傳遞過去的引數
    function execCmd() {
        exec('python routes/CNN-read.py '+ cmds[no++], function (error, stdout, stderr) {
            if(error){
                console.error('error: ' + error);
                return;
            }
            console.log('receive: ' + stdout.split("#")[0] + ": " + stdout.split("#")[1]);

            //將返回的json資料解析,判斷是都執行下一步
            var json = JSON.parse(stdout.split("#")[1]);
            console.log(json.msg);
            if(json.sign == "1" && no < 4){
                execCmd();
            }
            if(json.sign == 'true'){
              req.session.b_name = json.msg;
              res.render('recognitionCheck');
            }
        });
    }
    
    return
  }

  /*$.ajax({
    type: "POST",
    url: "/helloWorld.py",
    data: {
      param: "hello world",
    }
  }).done((o) => {
     console.log(o)
  });*/
  
  //console.log("2/" + pic_file);
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