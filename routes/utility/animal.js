'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-取出單一會員資料
//------------------------------------------
var query = async function (an_id) {
    var result = {};

    await sql('SELECT * FROM public.animal WHERE an_id = $1', [an_id])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0];
            } else {
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
var add = async function (newData) {
    var result;
    await sql('INSERT INTO public.animal (an_name, an_variety, an_birth, an_size, an_depiction, an_pic, an_postdate, an_sex) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [newData.an_name, newData.an_variety, newData.an_birth, newData.an_size, newData.an_depiction, newData.an_pic, newData.an_postdate, newData.an_sex])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });
    //console.log(newData.m_email + "//" + newData.m_password + "//" + newData.m_nickname + "//" + newData.m_sex + "//" + newData.m_pic + "//" + newData.m_birth + "//" + newData.m_phone);
    return result;

}

//----------------------------------
// 執行資料庫動作的函式-更新會員資料
//----------------------------------
var update = async function (newData) {
    var result;

    await sql('UPDATE public.animal SET an_name=$1, an_variety=$2, an_birth=$3, an_size=$4, an_depiction=$5, an_pic=$6, an_sex=$7 WHERE an_id = $8', [newData.an_name, newData.an_variety, newData.an_birth, newData.an_size, newData.an_depiction, newData.m_pic, newData.an_sex, newData.an_id])
        .then((data) => {
            result = data.rowCount;
        }, (error) => {
            result = -1;
        });
    console.log("4////" + newData.an_name + "//" + newData.an_variety + "//" + newData.an_birth + "//" + newData.an_size + "//" + newData.an_depiction + "//" + newData.an_pic + "//" + newData.an_sex + "//" + newData.an_id);
    return result;

}

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var list = async function () {
    var result = [];

    await sql('SELECT * FROM public.animal ORDER BY an_id')
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });

    return result;
}

//----------------------------------
// 刪除
//----------------------------------
var remove = async function (an_id) {
    var result;

    await sql('DELETE FROM public.animal WHERE an_id = $1', [an_id])
        .then((data) => {
            result = data.rowCount;
        }, (error) => {
            result = -1;
        });

    return result;
}

//匯出
module.exports = { query, add, update, list, remove };