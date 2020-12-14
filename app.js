const express = require("express");
const articleRoutes = require("./routes/article");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/api/articles", articleRoutes.router);

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);
mongoose
  .connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology:true})
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
