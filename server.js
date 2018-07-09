const express = require("express"),
  mongoose = require("mongoose"),
  exphbs = require("express-handlebars"),
  bodyParser = require("body-parser"),
  path = require("path");

const app = express();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.use("/articles", express.static(path.join(__dirname, "public")));
app.use("/notes", express.static(path.join(__dirname, "public")));

const index = require("./routes/index"),
  articles = require("./routes/articles"),
  notes = require("./routes/notes"),
  scrape = require("./routes/scrape");

app.use("/", index);
app.use("/articles", articles);
app.use("/notes", notes);
app.use("/scrape", scrape);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Listening on http://localhost:${PORT}`);
});
