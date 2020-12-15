const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const articleRoutes = require("./routes/article");
const { cors, errorHandling } = require("./utils/middlewares");

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(cors);
app.use("/api/articles", articleRoutes.router);
app.use(errorHandling);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
