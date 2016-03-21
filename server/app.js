var http = require('http'),
	path = require('path'),
	
	util = require('util'),
	koa = require('koa');
	

var env = process.argv[2] || process.env.NODE_ENV;
var debug = 'production' !== env;
var viewDir =debug ? 'src' : 'asset' ;

var app = koa();
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
  console.log('a');
});

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
  console.log('b');
});
app.use(function *(){
	this.body ='hello world';
});

app.listen(3000);
