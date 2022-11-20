var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var LoginfailedRouter = require('./routes/Loginfailed');
var indexRouter = require('./routes/index');
var checkAuth = require('./routes/checkAuth');

//------------------------------------------------------------
// 增加引用模組
//------------------------------------------------------------
var aboutRouter = require('./routes/about');

var login = require('./routes/login');
var logout = require('./routes/logout');
var memberpage = require('./routes/memberpage');
var memberlogin = require('./routes/memberlogin');
var membereditor = require('./routes/membereditor');
var memberupdate = require('./routes/memberupdate');

var register = require('./routes/register');
var newregister = require('./routes/newregister');

var detail = require('./routes/detail');
var detailadd = require('./routes/detailadd');

var feedbackadd = require('./routes/feedbackadd');

var billboardRouter = require('./routes/billboard');
var brandRouter = require('./routes/brand');
var productRouter = require('./routes/product');
var donateRouter = require('./routes/donate');
var recognitionRouter = require('./routes/recognition');
var recognitionSelectRouter = require('./routes/recognitionSelect');
var recognitionAnsRouter = require('./routes/recognitionAns');
var recognitionCheckRouter = require('./routes/recognitionCheck');
var newsRouter = require('./routes/news');

var brand_list = require('./routes/brand_list');
var leapingbunny = require('./routes/leapingbunny');
var ccf = require('./routes/ccf');
var peta = require('./routes/peta');
var nmcb = require('./routes/nmcb');
var allbrand = require('./routes/allbrand');

var empindex = require('./routes/empindex');
var addanimal = require('./routes/addanimal');
var newanimal = require('./routes/newanimal');
var animaledit = require('./routes/animaledit');
var animalcheck = require('./routes/animalcheck');
var animalcheckno = require('./routes/animalcheckno');
var animalupdateno = require('./routes/animalupdateno');
var animaldelno = require('./routes/animaldelno');
var adopterdetail = require('./routes/adopterdetail');
var animallist = require('./routes/animallist');
var memberadmin = require('./routes/memberadmin');
var editbackmember = require('./routes/editbackmember');
var newevent = require('./routes/newevent');
var allevent = require('./routes/allevent');

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
app.use(express.static('public/selectPic'));
//-----------------------------------------

//--------------------------------------------------------------------
// 增加引用express-session
//--------------------------------------------------------------------
var session = require('express-session');
app.use(session({secret: '請更改成一個隨機字串用來加密產生的signedCookie', cookie: { maxAge: 18000000 }})); //時間30分鐘
//--------------------------------------------------------------------

app.use('/', indexRouter);
app.use('/', LoginfailedRouter);
app.use('/about', aboutRouter);

app.use('/login', login);
app.use('/logout', logout);
app.use('/memberpage', memberpage);
app.use('/memberlogin', memberlogin);
app.use('/membereditor', checkAuth, membereditor);
app.use('/memberupdate', checkAuth, memberupdate);

app.use('/register', register);
app.use('/newregister', newregister);

app.use('/detail', checkAuth, detail);
app.use('/detailadd', checkAuth, detailadd);

app.use('/feedbackadd', checkAuth, feedbackadd);

app.use('/billboard', billboardRouter);
app.use('/brand', brandRouter);
app.use('/product', productRouter);
app.use('/donate', donateRouter);
app.use('/recognition', recognitionRouter);
app.use('/recognitionSelect', recognitionSelectRouter);
app.use('/recognitionAns', recognitionAnsRouter);
app.use('/recognitionCheck', recognitionCheckRouter);
app.use('/news', newsRouter);

app.use('/brand/list', brand_list);
app.use('/leapingbunny', leapingbunny);
app.use('/ccf', ccf);
app.use('/peta', peta);
app.use('/nmcb', nmcb);
app.use('/allbrand', allbrand);

app.use('/empindex',  empindex);
app.use('/addanimal',  addanimal);
app.use('/newanimal',  newanimal);
app.use('/animaledit',  animaledit);
app.use('/animalcheck',  animalcheck);
app.use('/animalcheckno',  animalcheckno);
app.use('/animalupdateno',  animalupdateno);
app.use('/animaldelno',  animaldelno);
app.use('/adopterdetail',  adopterdetail);
app.use('/animallist',  animallist);
app.use('/memberadmin',  memberadmin);
app.use('/editbackmember',  editbackmember);
app.use('/newevent',  newevent);
app.use('/allevent',  allevent);

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
