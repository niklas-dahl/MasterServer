var subdomain = require('express-subdomain');
var express = require('express');
var app = express();
 
// *** Code examples below go here! *** 
 
 
var router = express.Router();
 
//api specific routes 
router.get('/', function(req, res) {
  console.log("api !!")
    res.send('Welcome to our API!');
});
 
router.get('/users', function(req, res) {
  console.log("api / users")
    res.json([
        { name: "Brian" }
    ]);
});

app.use(subdomain('api', router));


// example.com 
app.get('/', function(req, res) {
    console.log("root")
    res.send('Homepage');
});


app.use(function (req, res) {
  res.send("The requested subdomain does not exist");
});

app.listen(3000);