var express = require('express');
var router = express.Router();

//增加引用函式
const animal = require('./utility/animal');

//接收POST請求
router.post('/', function(req, res, next) {
    var an_id = req.body.an_id;   //取得產品編號
   
    animal.remove(an_id).then(d => {
        if(d>=0){
            res.render('animaldelno', {results:d});  //傳至成功頁面     
        }else{
            res.render('removeFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;