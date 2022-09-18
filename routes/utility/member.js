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
var one = async function(m_email){
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

//匯出
module.exports = {login, one};