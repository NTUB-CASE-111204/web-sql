var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
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
