var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./key-cert.pem')
}
var server = https.createServer(options,function(req,res){
  res.writeHead(200);
  res.end("hell world\n");
});
server.listen(3000);
console.log('web服务启动成功，可以在浏览器中访问：https://localhost:3000/');
