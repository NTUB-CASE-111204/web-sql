var express = require('express');
var router = express.Router();

//增加引用函式
const feedback = require('./utility/feedback');

const formatDate = (current_datetime) => {
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() + "." + current_datetime.getMilliseconds();
    return formatted_date;
}

//接收POST請求
router.post('/', function (req, res, next) {
    var m_email = req.session.m_email;
    var f_description = req.body.f_description;
    var f_content = req.body.f_content;
    var f_time = formatDate(new Date());
    console.log("1/" + f_time);

    // 建立一個新資料物件
    var newData = {
        m_email: m_email,
        f_description: f_description,
        f_content: f_content,
        f_time: f_time
    }
    console.log("2/" + m_email);
    feedback.add(newData).then(d => {
        console.log("3/" + d);
        if (d==0){
            res.render('feedbackSuccess');  //傳至成功頁面
        }else{
            res.render('feedbackFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;