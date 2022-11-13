'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-取出全部領養人資料
//------------------------------------------
var list = async function () {
    var result = {};

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
var query = async function (m_email) {
    var result = {};

    await sql('SELECT * FROM public.adopter WHERE m_email = $1', [m_email])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0];
            } else {
                sql('SELECT * FROM public.member WHERE m_email = $1', [m_email])
                    .then((data) => {
                        if (data.rows.length > 0) {
                            result = data.rows[0];
                        } else {
                            result = -1;
                        }
                    }, (error) => {
                        result = null;
                    });
            }
        }, (error) => {
            result = null;
        });

    return result;


}

//------------------------------------------
//執行資料庫動作的函式-新增領養人資料
//------------------------------------------
var add = async function (newData) {
    var result;

    await sql('SELECT * FROM public.adopter WHERE m_email = $1', [newData.m_email])
        .then((data) => {
            if (data.rows.length > 0) {
                sql('UPDATE public.adopter SET a_realname=$1, a_job=$2, a_phone=$3, a_address=$4, a_experience=$5, a_time=$6, a_remark=$7, a_updatetime=$8 WHERE m_email = $9', [newData.a_realname, newData.a_job, newData.a_phone, newData.a_address, newData.a_experience, newData.a_time, newData.a_remark, newData.a_updatetime, newData.m_email])
                    .then((data) => {
                        result = data.rowCount;
                    }, (error) => {
                        result = -1;
                    });
            } else {
                sql('INSERT INTO public.adopter (a_filltime, m_email, a_realname, a_job, a_phone, a_address, a_experience, a_time, a_remark, a_updatetime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [newData.a_filltime, newData.m_email, newData.a_realname, newData.a_job, newData.a_phone, newData.a_address, newData.a_experience, newData.a_time, newData.a_remark, newData.a_updatetime])
                    .then((data) => {
                        result = 0;
                    }, (error) => {
                        result = -1;
                    });
            }
        }, (error) => {
            result = null;
        });

    return result;
}


//匯出
module.exports = { list, query, add };