var http = require('http');

var name = process.argv.slice(2)[0];
const PORT = process.argv.slice(2)[1];

// Create your target server
http.createServer(function (req, res) {
  console.log("Request!");
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('This is '+name + ' successfully on ' + PORT + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();

}).listen(PORT, function () {
  console.log(name + " Server on " + PORT);

});