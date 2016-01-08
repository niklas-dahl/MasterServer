var express = require('express');
var subdomain = require('express-subdomain');

var serverConfig = require('./masterConfig.json');
var app = express();

var servers = [];
for(var i = 0; i < serverConfig.length; i++) {
  var serverName = serverConfig[i].name;
  var serverPath = serverConfig[i].path;
  var serverSubdomain = serverConfig[i].subdomain || ""; // change for subdomains
  var serverRedirect = serverConfig[i].redirect;

  if(serverRedirect) {
      // redirect route
      var found = false; 
      // search the redirect destination
      for(var serverId = 0; serverId < servers.length; serverId++) {
        if(servers[serverId].name === serverRedirect) {
          found = true;
          var route = (serverName === "DEFAULT") ? "/" : "/"+serverSubdomain;
          app.use(route, servers[serverId].router);  
          break;
        }
      }
      if(!found) throw new Error("redirect to " + serverRedirect + " does not exist (destination must come BEFORE redirect in config)");
  } else {
    // add server to main route
    var router = require(serverPath)();
    servers.push({
      name: serverName,
      router: router
    }); // get this from config
    
    // install route
    // app.use( subdomain(serverSubdomain, require(serverPath)() ) );
    app.use("/"+serverSubdomain, router);
  }

}

// install default // this should not conflict with default in config
app.use(function (req, res){
  res.send("The requested subdomain does not exist");
});

app.listen(5050, function () {
  console.log("listening on port 5050")
});