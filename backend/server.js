const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

app.listen(process.env.PORT);

app.use(bodyParser.json({ limit: "2mb" }));
//app.use(bodyParser.urlencoded({ extended: true }));

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, result) => {
  if (err) return console.log(err);
  const database = result.db("ttselect");
  require("./allRoutes")(app, database);
  console.log("success! live on port " + process.env.PORT);
});
