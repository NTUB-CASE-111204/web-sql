var express = require('express');
var router = express.Router();

//增加引用函式
const brand = require('./utility/brandall');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('brand', { title: 'Express' });
});
*/

//接收GET請求
router.get('/', function(req, res, next) {
  brand.updatetime().then(data => {
      if(data==null){
          res.render('error');  //導向錯誤頁面
      }else if(data.length > 0){
          res.render('brand', {items:data});  //將資料傳給顯示頁面
      }else{
          res.render('notFound');  //導向找不到頁面
      }  
  })
});

module.exports = router;

// var server = require("./server"); 
// var router = require("./router"); 
// var requestHandlers = require("./requestHandlers"); 
 
// var handle = {} 
// //區分大小寫的 
// handle["/"] = requestHandlers.start; 
// handle["/start"] = requestHandlers.start; 
// handle["/upload"] = requestHandlers.upload; 
// handle["/show"] = requestHandlers.show; 
 
// server.start(router.route, handle); 
