var express = require('express');
var app = express();

// express托管静态文件
app.use(express.static('public'));

// 使用模板引擎
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var book = require('./routes/book');

app.get('/', book);

// 监听端口
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('The app listening at http://%s:%s', host, port);
});
