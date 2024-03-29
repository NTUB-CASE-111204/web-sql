var express = require('express');
var router = express.Router();

//增加引用函式
const adoptdetail = require('./utility/adoptdetail');

const formatDate = (current_datetime)=>{
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() + "." + current_datetime.getMilliseconds();
  return formatted_date;
}

//接收POST請求
router.post('/', function (req, res, next) {
  var a_filltime = formatDate(new Date());
  var m_email = req.body.m_email;
  var a_realname = req.body.a_realname;
  var a_job = req.body.a_job;
  var a_phone = req.body.a_phone;
  var a_address = req.body.a_address;
  var a_experience = req.body.a_experience;
  var a_time = req.body.a_time;
  var a_remark = req.body.a_remark;
  var a_updatetime = formatDate(new Date());
  console.log("1/" + a_experience);

  // 建立一個新資料物件
  var newData = {
    a_filltime: a_filltime,
    m_email: m_email,
    a_realname: a_realname,
    a_job: a_job,
    a_phone: a_phone,
    a_address: a_address,
    a_experience: a_experience,
    a_time: a_time,
    a_remark: a_remark,
    a_updatetime: a_updatetime
  }
  console.log("2/" + m_email);
  adoptdetail.add(newData).then(d => {
    console.log("3/" + d);
    if (d != -1 || d != error) {
      res.render('detailaddSuccess');  //傳至成功頁面
    } else {
      res.render('detailaddFail');     //導向錯誤頁面
    }
  })
});

module.exports = router;