const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRouter = require("./router/authRouter.js");
const postRouter = require("./router/postRouter.js");

const app = express();
app.use("/public", express.static(path.join(__dirname + "/public")));

const corsOption = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.use("/auth", authRouter);
app.use("/post", postRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

module.exports = app;
