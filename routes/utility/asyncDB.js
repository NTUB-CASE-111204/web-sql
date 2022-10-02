'use strict';

//-----------------------
// 引用資料庫模組
//-----------------------
const {Client} = require('pg');

//-----------------------
// 自己的資料庫連結位址
//-----------------------
//var pgConn = 'postgres://ikojmqzefffjen:079aad0bfbbc125c2f41389d7d65a83fe63f775aa42799b01120e8edb480ab2f@ec2-54-209-221-231.compute-1.amazonaws.com:5432/d28e9f04ls9tcu';

const config = {
    host: 'db.zvkaicfdjrsrevzuzzxh.supabase.co',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'postgres',     
    password: 'TiBmTydtbNZ6YfiZ',
    database: 'postgres',
    port: 5432,
    ssl: true
};

//產生可同步執行sql的函式
function query(sql, value=null) {
    return new Promise((resolve, reject) => {
        //產生資料庫連線物件
        var client = new Client(config);     

        //連結資料庫
        client.connect();

        //執行並回覆結果  
        client.query(sql, value, (err, results) => {                   
            if (err){
                reject(err);
            }else{
                resolve(results);
            }

            //關閉連線
            client.end();
        });
    });
}

//匯出
module.exports = query;