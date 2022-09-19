// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const dateResponse = (date) => {
  const DateObject =
    typeof date === "undefined"
      ? new Date()
      : isNaN(Number(date))
      ? new Date(date)
      : new Date(Number(date));

  return DateObject == "Invalid Date"
    ? { error: DateObject.toString() }
    : { unix: DateObject.getTime(), utc: DateObject.toUTCString() };
};

app.get("/api/:date?", (req, res) => res.json(dateResponse(req.params.date)));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
