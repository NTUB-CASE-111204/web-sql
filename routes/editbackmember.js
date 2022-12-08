var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.get('/', function(req, res, next) {
    var m_email = req.query.m_email;

    member.query(m_email).then(d => {
        if (d!=null && d!=-1){
            var data = {
                m_email: d.m_email,
                m_password: d.m_password,
                m_nickname: d.m_nickname,
                m_sex: d.m_sex,
                m_birth: d.m_birth,
                m_phone: d.m_phone,
                m_pic: d.m_pic
            }

            if(data.m_birth != '' && data.m_birth != null){
                if((data.m_birth.getMonth() + 1) < 10){
                    bmonth = '0' + (data.m_birth.getMonth() + 1);
                }else{
                    bmonth = (data.m_birth.getMonth() + 1);
                }
                if(data.m_birth.getDate() < 10){
                    bdate = '0' + data.m_birth.getDate();
                }else{
                    bdate = data.m_birth.getDate();
                }
                data.m_birth = data.m_birth.getFullYear() + "-" + bmonth + "-" + bdate;
            }
            
            if (data.m_pic == null || data.m_pic == '') {
                data.m_pic = "icon-07.png";
            }

            res.render('editbackmember', {item:data});  //將資料傳給更新頁面
        }else{
            res.render('empaddnotfound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;
