## Master Server
_Work in Progress!_

### One Server to rule them all
A server to spawn and manage child servers for diffrent subdomains

### Prerequisites
- Your child server must export his Router
- Your child server should not spawn his own server
- Add your child server to the masterConfig.json

### Example masterConfig.json
``` js
[
  {
    "name": "Root Website",
    "path": "./childServers/rootServer"
  },
  {
    "subdomain": "www",
    "redirect": "Root Website"
  },
  {
    "name": "Api Server",
    "subdomain": "api",
    "path": "./childServers/apiServer"
  },
  {
    "name": "Niklas Website",
    "subdomain": "niklas",
    "path": "./childServers/niklasServer"
  },
  {
    "subdomain": "api.niklas",
    "redirect": "Api Server"
  }
]
```
