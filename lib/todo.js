var http = require('http');
var url =require('url');
var items = [];

var server = http.createServer(function(req,res){
  switch(req.method) {
    case 'POST':
      var item = '';
      req.setEncoding('utf8');
      req.on('data',function(chunk){
        item += chunk;
      });
      req.on('end',function(){
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'GET':
      var body = items.map(function(item, i){
        return i + ')'+item +'\n';
      }).join('\n');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain;charset="utf-8"');
      res.end(body);
      break;
    case 'DELETE':
      var path = url.parse(req.url).pathname;
      var i = parseInt(path.slice(1), 10);
      if(isNaN(i)) {
        res.statusCode = 400;
        res.end('参数错误');
      } else if(!items[i]) {
        res.statusCode = 404;
        res.end('未找到请求资源');
      } else {
        items.splice(i,1);
        res.end('删除成功\n');
      }
      break;
    case 'PUT':
      var path = url.parse(req.url).pathname;
      var i = parseInt(path.slice(1),10);
      if(isNaN(i)) {
        res.statusCode = 400;
        res.end('参数错误');
      } else if(!items[i]) {
        res.statusCode = 404;
        res.end('未找到请求资源');
      } else {
        var item = '';
        req.setEncoding('utf8');
        req.on('data',function(chunk){
          item += chunk;
        });
        req.on('end',function(){
          items.splice(i,1,item);
          res.end('更新成功\n');
        });
      }
      break;
  }
});
server.listen(3000);
console.log('web服务启动成功，可以在浏览器中访问：http://localhost:3000');
