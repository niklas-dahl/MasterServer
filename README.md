## Master Server
_Work in Progress!_

### One Server to rule them all
A server to spawn and manage child-servers for diffrent subdomains

### Prerequisites
- Your child server must export his Router
- Your child server should not spawn his own server
- Add your child server to the masterConfig.json

### Example masterConfig.json
``` js
[
  {
    "name": "Root Website",
    "path": "./childServers/rootServer.js"
  },
  {
    "subdomain": "www",
    "redirect": "Root Website"
  },
  {
    "name": "Api Server",
    "subdomain": "api",
    "path": "./childServers/apiServer.js"
  },
  {
    "name": "Niklas Website",
    "subdomain": "niklas",
    "path": "./childServers/niklasServer.js"
  },
  {
    "subdomain": "api.niklas",
    "redirect": "Api Server"
  }
]
```
#### name
The name is there to identify the server and used for redirects

#### subdomain
The subdomain the server should get request from

#### redirect
The name of another server to redirect the request to (Destination server must come BEFORE redirect in config)

#### path
The path to your child-servers start file that exports the express Router