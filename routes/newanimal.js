var express = require('express');
var router = express.Router();

//增加引用函式
const animal = require('./utility/animal');

const formatDate = (current_datetime) => {
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() + "." + current_datetime.getMilliseconds();
    return formatted_date;
}

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
    // 如果有選擇圖片
    if (typeof req.file != 'undefined') {
        // 傳入檔案不可超過maxSize
        if (req.file.size > maxSize) {
            res.render('fileSizeError');  //圖片過大
            return;
        }
    }

    var an_name = req.body.an_name;
    var an_variety = req.body.an_variety;
    var an_birth = req.body.an_birth;
    var an_size = req.body.an_size;
    var an_depiction = req.body.an_depiction;
    var an_pic;
    var an_postdate = formatDate(new Date());
    //var m_phone = Number(req.body.m_phone);

    // 如果有選擇圖片
    if (typeof (req.file) != 'undefined') {
        an_pic = req.file.filename;   //取得上傳照片名稱
    }

    // 建立一個新資料物件
    var newData = {
        an_name: an_name,
        an_variety: an_variety,
        an_birth: an_birth,
        an_size: an_size,
        an_depiction: an_depiction,
        an_pic: an_pic,
        an_postdate: an_postdate
    }

    console.log("2/" + an_pic);
    animal.add(newData).then(d => {
        console.log("3/" + d);
        if (d == 0) {
            res.render('animallist');  //傳至成功頁面
        } else {
            res.render('addFail');     //導向錯誤頁面
        }
    })
});
module.exports = router;