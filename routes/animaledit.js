var express = require('express');
var router = express.Router();

//增加引用函式
const animal = require('./utility/animal');

//接收GET請求
router.get('/', function(req, res, next) {
    var  an_id = req.session. an_id;

    animal.list(an_id).then(d => {
        if (d!=null && d!=-1){
            var data = {
                an_id: d.an_id,
                an_name: d.an_name,
                an_variety: d.an_variety,
                an_birth: d.an_birth,
                an_size: d.an_size,
                an_depiction: d.an_depiction,
                an_pic: d.an_pic,
                an_sex: d.an_sex
            }
            console.log(an_id)
            res.render('animaledit', {item:data});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;
