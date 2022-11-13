var express = require('express');
var router = express.Router();

const adoptdetail = require('./utility/adoptdetail');

//接收GET請求
router.get('/', function(req, res, next) {
    var m_email = req.session.m_email;

    adoptdetail.query(m_email).then(data => {
        if (data != null && data != -1) {
            var data = {
                m_email: data.m_email,
                a_realname: data.a_realname,
                a_job: data.a_job,
                a_phone: data.a_phone,
                a_address: data.a_address,
                a_experience: data.a_experience,
                a_time: data.a_time,
                a_remark: data.a_remark,
                a_updatetime: data.a_updatetime
            }

            res.render('detail', {item:data});  //將資料傳給更新頁面
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })

});

module.exports = router; 
