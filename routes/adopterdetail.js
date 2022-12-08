var express = require('express');
var router = express.Router();

//增加引用函式
const adoptdetail = require('./utility/adoptdetail');

//接收GET請求
router.get('/', function (req, res, next) {
    adoptdetail.list().then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.length > 0) {
            for (i = 0; i < data.length; i++) {
                if (data[i].a_filltime != null) {
                    data[i].a_filltime = data[i].a_filltime.getFullYear() + "-" + (data[i].a_filltime.getMonth() + 1) + "-" + data[i].a_filltime.getDate();
                }
            }
            for (i = 0; i < data.length; i++) {
                if (data[i].a_updatetime != null) {
                    data[i].a_updatetime = data[i].a_updatetime.getFullYear() + "-" + (data[i].a_updatetime.getMonth() + 1) + "-" + data[i].a_updatetime.getDate();
                }
            }
            for (i = 0; i < data.length; i++) {
                if (data[i].a_experience == true) {
                    data[i].a_experience = "有";
                }else{
                    data[i].a_experience = "無";
                }
            }
            res.render('adopterdetail', { items: data });  //將資料傳給顯示頁面
        } else {
            res.render('empaddnotfound');  //導向找不到頁面
        }
    })
});

module.exports = router;