var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var checkAuth = require('./routes/checkAuth');

//------------------------------------------------------------
// 增加引用模組
//------------------------------------------------------------
var aboutRouter = require('./routes/about');
var loginRouter = require('./routes/login');
var memberRouter = require('./routes/memberpage');
var memberlogin = require('./routes/memberlogin');
var registerRouter = require('./routes/register');
var detailRouter = require('./routes/detail');
var detailadd = require('./routes/detailadd');
var billboardRouter = require('./routes/billboard');
var brandRouter = require('./routes/brand');
var productRouter = require('./routes/product');
var donateRouter = require('./routes/donate');
var recognitionRouter = require('./routes/recognition');
var newsRouter = require('./routes/news');
var brand_list = require('./routes/brand_list');
var leapingbunny = require('./routes/leapingbunny');
var ccf = require('./routes/ccf');
var peta = require('./routes/peta');
var nmcb = require('./routes/nmcb');
//------------------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//----------------------------------------
// 可由外部直接取用資料夾
//----------------------------------------
app.use(express.static('public/pic'));
//-----------------------------------------

//--------------------------------------------------------------------
// 增加引用express-session
//--------------------------------------------------------------------
var session = require('express-session');
app.use(session({secret: '請更改成一個隨機字串用來加密產生的signedCookie', cookie: { maxAge: 60000 }}));
//--------------------------------------------------------------------

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/login', loginRouter);
app.use('/memberpage', memberRouter);
app.use('/memberlogin', memberlogin);
app.use('/register', registerRouter);
app.use('/detail', detailRouter);
app.use('/detailadd', detailadd);
app.use('/billboard', billboardRouter);
app.use('/brand', brandRouter);
app.use('/product', productRouter);
app.use('/donate', donateRouter);
app.use('/recognition', recognitionRouter);
app.use('/news', newsRouter);

app.use('/brand/list', brand_list);
app.use('/leapingbunny', leapingbunny);
app.use('/ccf', ccf);
app.use('/peta', peta);
app.use('/nmcb', nmcb);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
