'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-取出全部領養人資料
//------------------------------------------
var list = async function(){
    var result={};
    
    await sql('SELECT * FROM public.adopter ORDER BY a_filltime')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-取出領養人帳號
//------------------------------------------
var member = async function(){
    var result={};
    
    await sql('SELECT m_email, m_phone FROM public.member')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-新增領養人資料
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO public.adopter (a_filltime, m_email, a_realname, a_job, a_phone, a_address, a_experience, a_time, a_remark) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [newData.a_filltime, newData.m_email, newData.a_realname, newData.a_job, newData.a_phone, newData.a_address, newData.a_experience, newData.a_time, newData.a_remark])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
        console.log(newData.a_filltime + "//" +newData.m_email + "//" + newData.a_realname + "//" + newData.a_job + "//" + newData.a_address + "//" + newData.a_time + "//" + newData.a_remark);
		
    return result;
}

//匯出
module.exports = {list,member,add};