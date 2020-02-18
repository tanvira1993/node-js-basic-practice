const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./api/routes/users-router");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    key: "I am value"
  });
  //   res.send("<h1>welcome.html</h1>");
});

app.use("/api/users", userRouter);

mongoose
  .connect("mongodb://localhost:27017/crud_mean", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(4200, () => {
      console.log("Application is ready to serve on port 4200");
    });
  })
  .catch(e => {
    console.log(e);
  });
