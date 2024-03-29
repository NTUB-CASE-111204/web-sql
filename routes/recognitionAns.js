var express = require('express');
var router = express.Router();

//增加引用函式
const brand = require('./utility/brandall');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//接收GET請求
router.get('/', function(req, res, next) {
    var b_name = req.session.b_name;

    brand.brandselect(b_name).then(data => {
        if(data==null){
            console.log(data);
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){
            res.render('notFound');  //導向找不到頁面
        }else{
            console.log(data);
            res.render('recognitionAns', {item:data,selectName:req.session.b_name});  //將資料傳給顯示頁面
            req.session.b_name = null;
        }  
    })
});

module.exports = router;