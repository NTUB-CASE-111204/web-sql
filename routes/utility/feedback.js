'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-新增會員資料
//------------------------------------------
var add = async function (newData) {
    var result;
    await sql('INSERT INTO public.feedback (m_email, f_description, f_content, f_time) VALUES ($1, $2, $3, $4)', [newData.m_email, newData.f_description, newData.f_content, newData.f_time])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });
    console.log(newData.m_email + "//" + newData.f_description + "//" + newData.f_content + "//" + newData.f_time);
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var list = async function () {
    var result = [];

    await sql('SELECT * FROM public.feedback ORDER BY f_time desc')
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });

    return result;
}

//匯出
module.exports = { add, list };