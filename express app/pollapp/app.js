const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/", (req, res) => {
  console.log('hello form console');
  fs.readFile("demofile1.html", function(err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    console.log('data =>',data);
    res.end();
  });
  // res.render("home");
});

mongoose
  .connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
  .then(response => {
    app.listen(2000, () => {
      console.log("app ruuning");
    });
  })
  .catch(error => {
    console.log("server err", error);
  });
