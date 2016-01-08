var express = require('express');
var subdomain = require('express-subdomain');

var serverConfig = require('./masterConfig.json');
var app = express();

const PORT = 80;
var routes = [];

for(var i = 0; i < serverConfig.length; i++) {
  var serverName = serverConfig[i].name;
  var serverPath = serverConfig[i].path;
  var serverSubdomain = serverConfig[i].subdomain || ""; // change for subdomains
  var serverRedirect = serverConfig[i].redirect;

  if(serverRedirect) {
      // redirect route
      var found = false; 
      // search the redirect destination
      for(var serverId = 0; serverId < routes.length; serverId++) {
        if(routes[serverId].name === serverRedirect) {
          found = true;
          var route = "/"+serverSubdomain;
          app.use(route, routes[serverId].router); // change to subdomain

          routes.push({
            redirect: serverRedirect,
            subdomain: serverSubdomain // remove duplicate code
          });
          break;
        }
      }
      if(!found) throw new Error("redirect to " + serverRedirect + " does not exist (destination must come BEFORE redirect in config)");
  } else {
    // add server to main route
    // install route
    // app.use( subdomain(serverSubdomain, require(serverPath)() ) );
    var router = require(serverPath)();
    app.use("/"+serverSubdomain, router);
    
    routes.push({
      name: serverName,
      router: router,
      subdomain: serverSubdomain
    }); // get this from config
  }

}

// install default // this should not conflict with default in config
app.use(function (req, res){
  res.send("The requested subdomain does not exist");
});

app.listen(PORT, function () {
  console.log("Master Server started on port " + PORT);

  console.log("Routes: " + routes.length)
  for(var routeId = 0; routeId < routes.length; routeId++) {
    var ser = routes[routeId];
    if(ser.redirect) {
      console.log((routeId+1)+"/"+routes.length+" "+ser.subdomain + " -> " + ser.redirect);
    } else {
      console.log((routeId+1)+"/"+routes.length+" "+ser.name + " @" + ser.subdomain);
    }
  }
});