var express = require('express');
var router = express.Router();

// 连接数据库
var mysql = require('mysql');
var setting = require('../db/db');
var connection = mysql.createConnection(setting.db);
connection.connect();

router.get('/', function (req, res) {
    // searchById('I20170322001',req,res);
    // searchByName('世界历史',req,res);
    // if 选择ID查询则
    var sql = 'select * from book_info where id = ?';
    var id = 'I20170322001';
    search(sql, id, req, res);

    // search('select * from book_info where bookName = ?', '世界历史', req, res);

});
function search(sql, condition, req, res) {
    connection.query(sql, condition, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        } else if (rows.length <= 0) {
            console.log('No Found');
            return;
        }
        res.render('index', {books: rows});
    });
}


module.exports = router;