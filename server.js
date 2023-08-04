const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const session = require("express-session");
const passport = require("./auth/passport");
const PORT = 6533;
const app = express();
app.use(
  session({
    secret: "newsecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
mongoose.connect("mongodb://127.0.0.1:27017/eCommerceDB").then(
  app.listen(PORT, () => {
    console.log(`server is started at http://localhost:${PORT}`);
  })
);
