var http = require('http'),
    httpProxy = require('http-proxy');
var express = require('express');
var app = express();
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

// add proxy x-forwarded-for header
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  var remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  proxyReq.setHeader('x-forwarded-for', remoteAddress);
});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
app.use("/num1", function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://localhost:9999' });
});

app.use("/num2", function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://localhost:8888' });
});

app.use(function (req, res){
  res.send("The requested subdomain does not exist");
});

app.listen(5050, function () {
  console.log("listening on port 5050")
});