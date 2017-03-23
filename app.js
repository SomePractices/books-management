var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = 3000;
// var index = require('./routes/index');
// var users = require('./routes/users');
var book = require('./routes/book');


var app = express();

// express托管静态文件
app.use(express.static('public'));



// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.get('/book', book);

// app.use('/', index);
// app.use('/users', users);
// app.use(express.static('./public'));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.get("/",function (req, res) {
  res.render("index");
});
app.get("/login",function (req, res) {
  res.render("login");
});

// app.listen(process.env.PORT || 3000, function () {
 // db.connect((err) => {
   // if (err) return console.error('db connection failed');
  // });
// });
app.listen(port);
console.log('Listening on 3000');

module.exports = app;


