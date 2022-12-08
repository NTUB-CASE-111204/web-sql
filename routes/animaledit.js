var express = require('express');
var router = express.Router();

const animal = require('./utility/animal');


//接收GET請求
router.get('/', function (req, res, next) {
    var an_id = req.query.an_id;

    animal.query(an_id).then(data => {
        if (data != null && data != -1) {
            var data = {
                an_id: data.an_id,
                an_name: data.an_name,
                an_variety: data.an_variety,
                an_birth: data.an_birth,
                an_size: data.an_size,
                an_depiction: data.an_depiction,
                an_pic: data.an_pic,
                an_postdate: data.an_postdate,
                an_sex: data.an_sex
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
            res.render('animaledit', { item: data });  //將資料傳給顯示頁面
        } else {
            res.render('empaddnotfound');  //導向找不到頁面
        }
    })
});

module.exports = router;