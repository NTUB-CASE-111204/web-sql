var express = require('express');
var router = express.Router();

const adoptdetail = require('./utility/adoptdetail');

//接收GET請求
router.get('/', function(req, res, next) {
    var m_email = req.session.m_email;; 

    adoptdetail.query(m_email).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面             
        }else{
            res.render('detail', {item:data});  //將資料傳給顯示頁面
        }  
    })

});

module.exports = router; 
