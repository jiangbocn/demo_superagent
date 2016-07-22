var express = require('express');
var router = express.Router();

var superagent = require("../modules/superagent")();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    data: ''
  });
});

/* GET goodsInfo. */
router.get('/goodsInfo', function(req, res, next) {

  var args = {
    method: 'get',
    url: 'http://sm.romenscd.cn:3800/api/v1/miniGoods/10',
    data: {}
  };

  superagent.sendData(args.method, args.url, args.data, function(err, result) {
    if(err){
      console.log('error: ', err + '\n');
      res.render('index', {
        title: '错误：',
        data: err
      });
    }else{
      res.render('index', {
        title: '商品详情：',
        data: JSON.stringify(result, null, 2)
      });
    }
  });

});

/* GET goodsList. */
router.get('/goodsList', function(req, res, next) {

  var args = {
    method: 'post',
    url: 'http://sm.romenscd.cn:3800/api/v1/miniGoods',
    data: {
      "page": 1,
      "pageSize": 10,
      "sortBy": "+boughtTimes",
      "goodsTypes": "",
      "search": ""
    }
  };

  superagent.sendData(args.method, args.url, args.data, function(err, result) {
    if(err){
      console.log('error: ', err + '\n');
      res.render('index', {
        title: '错误：',
        data: err
      });
    }else{
      res.render('index', {
        title: '商品列表：',
        data: JSON.stringify(result, null, 2)
      });
    }
  });

});


/* GET goodsList. */
router.get('/weibo', function(req, res, next) {

  var args = {
    method: 'get',
    url: 'http://api.douban.com/labs/bubbler',
    data: {
    }
  };

  superagent.sendData(args.method, args.url, args.data, function(err, result) {
    if(err){
      console.log('error: ', err + '\n');
      res.render('index', {
        title: '错误：',
        data: err
      });
    }else{
      res.render('index', {
        title: '商品列表：',
        data: JSON.stringify(result, null, 2)
      });
    }
  });

});

module.exports = router;
