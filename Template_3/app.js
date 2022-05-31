const express = require("express");
const app = express();

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const port = 8080;

try {
  main();
} catch (error) {
  console.log(error);
}

async function main() {
  await mongoose.connect("mongodb://localhost:27017/userDB");

  const users = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true,
    },
  });

  const user = new mongoose.model("user", users);
  const myEmail = "aashishsingla567@gmail.com";
  const myName = "Aashish";
  let user_name = "Aashish";
  let findMe = user.find({
    email: `${myEmail}`,
  });
  if (findMe != null) user_name = findMe.name;
  else {
    const aashish = {
      name: `${myName}`,
      email: `${myEmail}`,
    };
    let me = new user(aashish);
    await me.save();
  }
  app.use("/", express.static("static"));

  app.set("view engine", "pug");

  app.set("views", path.join(__dirname, "views"));

  app.get("/", (req, res) => {
    res.status(200).render("index", {
      user_name: `${user_name}`,
    });
  });
  app.get("/freeTrail", (req, res) => {
    res.status(200).render("freeTrail", {
      user_name: `${user_name}`,
    });
  });
  app.get("/register", (req, res) => {
    res.status(200).render("register", {
      user_name: `${user_name}`,
    });
  });
  app.get("/quickLinks", (req, res) => {
    res.status(200).render("quickLinks", {
      user_name: `${user_name}`,
    });
  });
  
  app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
  });
}
