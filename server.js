// Web Scraper Homework Solution Example
// (be sure to watch the video to see
// how to operate the site in the browser)
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var port = process.env.PORT || 8080;

// Instantiate our Express App
var app = express();

// Require our routes
var routes = require("./routes");

// Designate our public folder as a static directory
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use bodyParser in our app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Have every request go through our route middleware
app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Listen on the port
app.listen(port, function() {
  console.log("Listening on port: " + port);
});
