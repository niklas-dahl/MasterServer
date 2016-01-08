var express = require('express');

var createRouter = function (name) {
  var router = express.Router();

  router.get('/', function (req, res) {
    res.send("Homepage von Niklas!");
  });

  router.get('/info', function (req, res) {
    res.send("Hier gibs keine Info!");
  });

  return router;
};
module.exports = createRouter;

// if localDevelopment then start own server
var localDevelopment = false;
if(localDevelopment) {
  var app = express();
  app.use("/", createRouter());

  app.listen(3000, function () {
    console.log("local development server on :3000");
  })
}