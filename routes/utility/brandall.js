'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-取出全部品牌
//------------------------------------------
var list = async function(){
    var result={};
    
    await sql('SELECT * FROM public.brand ORDER BY b_name')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-取出單一商品
//------------------------------------------
var leapingbunny = async function(){
    var result={};
    
    await sql('SELECT * FROM public.brand WHERE leapingbunny = TRUE ORDER BY b_name')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

var ccf = async function(){
    var result={};
    
    await sql('SELECT * FROM public.brand WHERE ccf = TRUE ORDER BY b_name')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

var peta = async function(){
    var result={};
    
    await sql('SELECT * FROM public.brand WHERE peta = TRUE ORDER BY b_name')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

var nmcb = async function(){
    var result={};
    
    await sql('SELECT * FROM public.brand WHERE nmcb = TRUE ORDER BY b_name')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

var updatetime = async function(){
    var result={};
	
    await sql('SELECT * FROM public.brand ORDER BY updatetime desc')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
	//console.log(result);	
    return result;
}


//------------------------------------------
//執行資料庫動作的函式-取出找查結果之資料
//------------------------------------------
var brandselect = async function(b_name){
    var result={};

    await sql('SELECT * FROM public.brand WHERE b_name = $1', [b_name])
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
module.exports = {list, leapingbunny, ccf, peta, nmcb, updatetime, brandselect};