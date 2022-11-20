var express = require('express');
var router = express.Router();

const animal = require('./utility/animal');


//接收GET請求
router.get('/', function (req, res, next) {
    var an_id = req.query.an_id;

    animal.query(an_id).then(d => {
        if (d == null) {
            res.render('error');  //導向錯誤頁面           
        } else {
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
            if (data.an_birth != null) {
                data.an_birth = data.an_birth.getFullYear() + "-" + (data.an_birth.getMonth() + 1) + "-" + data.an_birth.getDate();
            }
            console.log(data.an_id);
            console.log(data.an_birth);
            console.log(data.an_pic);
            res.render('animaledit', { item: data });  //將資料傳給顯示頁面
        }
    })
});

module.exports = router;