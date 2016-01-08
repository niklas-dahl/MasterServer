var express = require('express');

var createRouter = function (name) {
  var router = express.Router();

  router.get('/', function (req, res) {
    res.send("willkommen auf der api");
  });

  router.get('/users', function (req, res) {
    res.json({name: "Niklas", alter: 18});
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