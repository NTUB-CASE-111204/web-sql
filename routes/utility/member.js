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
    if(newData.m_birth == '' && newData.m_phone != ''){
        await sql('INSERT INTO public.member (m_email, m_password, m_nickname, m_sex, m_pic, m_phone) VALUES ($1, $2, $3, $4, $5, $6)', [newData.m_email, newData.m_password, newData.m_nickname, newData.m_sex, newData.m_pic, newData.m_phone])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });
		//console.log(newData.m_email + "//" + newData.m_password + "//" + newData.m_nickname + "//" + newData.m_sex + "//" + newData.m_pic + "//" + newData.m_birth + "//" + newData.m_phone);
        return result;
    }else if (newData.m_phone == '' && newData.m_birth != ''){
        await sql('INSERT INTO public.member (m_email, m_password, m_nickname, m_sex, m_pic, m_birth) VALUES ($1, $2, $3, $4, $5, $6)', [newData.m_email, newData.m_password, newData.m_nickname, newData.m_sex, newData.m_pic, newData.m_birth])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });
		//console.log(newData.m_email + "//" + newData.m_password + "//" + newData.m_nickname + "//" + newData.m_sex + "//" + newData.m_pic + "//" + newData.m_birth + "//" + newData.m_phone);
        return result;
    }else if (newData.m_phone == '' && newData.m_birth == ''){
        await sql('INSERT INTO public.member (m_email, m_password, m_nickname, m_sex, m_pic) VALUES ($1, $2, $3, $4, $5)', [newData.m_email, newData.m_password, newData.m_nickname, newData.m_sex, newData.m_pic])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });
		//console.log(newData.m_email + "//" + newData.m_password + "//" + newData.m_nickname + "//" + newData.m_sex + "//" + newData.m_pic + "//" + newData.m_birth + "//" + newData.m_phone);
        return result;
    }else{
        await sql('INSERT INTO public.member (m_email, m_password, m_nickname, m_sex, m_pic, m_birth, m_phone) VALUES ($1, $2, $3, $4, $5, $6, $7)', [newData.m_email, newData.m_password, newData.m_nickname, newData.m_sex, newData.m_pic, newData.m_birth, newData.m_phone])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });
		//console.log(newData.m_email + "//" + newData.m_password + "//" + newData.m_nickname + "//" + newData.m_sex + "//" + newData.m_pic + "//" + newData.m_birth + "//" + newData.m_phone);
        return result;
    }
}

//----------------------------------
// 執行資料庫動作的函式-更新會員資料
//----------------------------------
var update = async function (newData) {
    var result;

    if(newData.m_birth == '' && newData.m_phone != ''){
        await sql('UPDATE public.member SET m_password=$1, m_nickname=$2, m_sex=$3, m_phone=$4, m_pic=$5 WHERE m_email = $6', [newData.m_password, newData.m_nickname, newData.m_sex, newData.m_phone, newData.m_pic, newData.m_email])
        .then((data) => {
            result = data.rowCount;
        }, (error) => {
            result = -1;
        });
        console.log("1////" + newData.m_email + "//" + newData.m_password + "//" + newData.m_nickname + "//" + newData.m_sex + "//" + newData.m_pic + "//" + newData.m_birth + "//" + newData.m_phone);
        return result;
    }else if (newData.m_phone == '' && newData.m_birth != ''){
        await sql('UPDATE public.member SET m_password=$1, m_nickname=$2, m_sex=$3, m_birth=$4, m_pic=$5 WHERE m_email = $6', [newData.m_password, newData.m_nickname, newData.m_sex, newData.m_birth, newData.m_pic, newData.m_email])
        .then((data) => {
            result = data.rowCount;
        }, (error) => {
            result = -1;
        });
        console.log("2////" + newData.m_email + "//" + newData.m_password + "//" + newData.m_nickname + "//" + newData.m_sex + "//" + newData.m_pic + "//" + newData.m_birth + "//" + newData.m_phone);
        return result;
    }else if (newData.m_phone == '' && newData.m_birth == ''){
        await sql('UPDATE public.member SET m_password=$1, m_nickname=$2, m_sex=$3, m_pic=$4 WHERE m_email = $5', [newData.m_password, newData.m_nickname, newData.m_sex, newData.m_pic, newData.m_email])
        .then((data) => {
            result = data.rowCount;
        }, (error) => {
            result = -1;
        });
        console.log("3////" + newData.m_email + "//" + newData.m_password + "//" + newData.m_nickname + "//" + newData.m_sex + "//" + newData.m_pic + "//" + newData.m_birth + "//" + newData.m_phone);
        return result;
    }else{
        await sql('UPDATE public.member SET m_password=$1, m_nickname=$2, m_sex=$3, m_birth=$4, m_phone=$5, m_pic=$6 WHERE m_email = $7', [newData.m_password, newData.m_nickname, newData.m_sex, newData.m_birth, newData.m_phone, newData.m_pic, newData.m_email])
        .then((data) => {
            result = data.rowCount;
        }, (error) => {
            result = -1;
        });
        console.log("4////" + newData.m_email + "//" + newData.m_password + "//" + newData.m_nickname + "//" + newData.m_sex + "//" + newData.m_pic + "//" + newData.m_birth + "//" + newData.m_phone);
        return result;
    }
}

//匯出
module.exports = {login, query, add, update};