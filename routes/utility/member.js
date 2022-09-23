'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 使用者登入
//---------------------------------------------
var login = async function(m_email, m_password){   
    var result;

    //取得員工資料
    await sql('SELECT * FROM public.member WHERE m_email=$1 and m_password=$2', [m_email, m_password])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];
            }else{
                result = null;
            } 
        }, (error) => {
            result = null;
        });
    
    //回傳物件
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-取出單一會員資料
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
//執行資料庫動作的函式-新增會員資料
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO public.member(m_email, m_password, m_nickname, m_sex, m_pic, m_birth, m_phone, m_adopt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [newData.m_email, newData.m_password, newData.m_nickname,newData.m_sex, newData.m_pic, newData.m_birth, newData.m_phone, newData.m_adopt])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}


//匯出
module.exports = {login, query, add};