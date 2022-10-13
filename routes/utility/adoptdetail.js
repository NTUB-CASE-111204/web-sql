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
var query = async function(m_email){
    var result={};
    
    await sql('SELECT * FROM public.member WHERE m_email = $1', [m_email])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];   
            }else{
                result = -1;
            }    
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
    var now = new Date().toLocaleString();
    await sql('INSERT INTO public.adopter (a_filltime, m_email, a_realname, a_job, a_phone, a_address, a_experience, a_time, a_remark) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [now, newData.m_email, newData.a_realname, newData.a_job, newData.a_phone, newData.a_address, newData.a_experience, newData.a_time, newData.a_remark])
        .then((data) => {
            result = 0; 
        }, (error) => {
            result = -1;
        });
        console.log(newData.a_filltime + "//" + newData.a_realname + "//" + newData.m_email + "//" + newData.a_job + "//" + newData.a_phone + "//" + newData.a_address + "//" + newData.a_remark + "//" + newData.a_experience + "//" + newData.a_time);
		
    return result;
}

//匯出
module.exports = {list,query,add};