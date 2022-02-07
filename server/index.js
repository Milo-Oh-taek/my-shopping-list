const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const multer = require("multer");

const itemRouter = require('./routes/item');
const userRouter = require('./routes/user');

dotenv.config();

const mongoose = require('mongoose');
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.bj67b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      // useNewUrlPaser: true,
      // useUnifiedTofology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/item", itemRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, function() {
    console.log('listening on 3001');
});