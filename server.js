// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


//timestamp json api
app.get("/api/timestamp/:date_string?", function(req, res) {
  let dateVal = req.params.date_string;
  if (dateVal === undefined) {
    let time = new Date();
    var unixTime = time.getTime();
    var utcTime = time.toUTCString();
  }
  else if(dateVal.indexOf("-") === -1) {
    let time = new Date(Number(dateVal));
    var unixTime = dateVal;
    var utcTime = time.toUTCString();
  }
  else {
    let time = new Date(dateVal);
    var unixTime = time.getTime();
    var utcTime = time.toUTCString();
  }
  res.json({unix: unixTime, utc: utcTime});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});