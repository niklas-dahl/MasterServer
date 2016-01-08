var express = require('express');

var createRouter = function (name) {
  var router = express.Router();

  router.get('/', function (req, res) {
    console.log("request @" + name)
    res.send('Hello World! ' + name);
  });

  return router;
};
module.exports = createRouter;

var localDevelopment = false;
if(localDevelopment) { // check for local development
  var app = express();
  app.use("/", createRouter());

  app.listen(3000, function () {
    console.log("local development server on :3000");
  })
}