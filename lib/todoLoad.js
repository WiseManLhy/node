var http = require('http');
var formidable = require('formidable');
var items = [];

var server = http.createServer(function(req,res){
  switch(req.method) {
    case 'GET':
      show(res);
      break;
    case 'POST':
      upload(req,res);
      break;
  }
});
server.listen(3000);
function show(res) {
  var html = `<html>
    <head><title>Todo List</title></head>
    <body>
      <h1>Toto List</h1>
      <ul>
      ${items.map(function(item){
        return '<li>'+item+'</li>'
      })}
      </ul>
      <form method="post" action="/" enctype="multipart/form-data">
        <p><input type="text" name="item" /></p>
        <p><input type="file" name="file" /></p>
        <p><input type="submit" value="Upload" /></p>
      </form>
    </body>
    </html>`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('content-Length', Buffer.byteLength(html));
  res.end(html);
}
function upload(req,res) {
  if(!isFormData(req)) {
    res.statusCode = 404;
    res.end('Bad Request:expecting multipart/form-data');
    return;
  }
  var form = new formidable.IncomingForm();
  form.on('progress',function(bytesReceived,bytesExpected){
    var percent = Math.floor(bytesReceived/bytesExpected*100);
    console.log(percent);
  });
  form.on('field',function(field,value){
    console.log(field);
    console.log(value);
  });
  form.on('file',function(name,file){
    console.log(name);
    console.log(file);
  });
  form.on('end',function(){
    res.end('upload complete!');
  });
  form.parse(req,function(err,fields,files){
    console.log(fields);
    console.log(files);
    res.end('upload complete!');
  });
}
function isFormData(req) {
  console.log(req.headers);
  var type = req.headers['content-type'] || '';
  return 0 == type.indexOf('multipart/form-dat');
}

console.log('web服务启动成功，可以在浏览器中访问：http://localhost:3000');
