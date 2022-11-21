var express = require('express');
var router = express.Router();
var db = require("../model/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

const saltRounds = 10;
//const supersecret = process.env.SUPER_SECRET;
//register the user
router.post("/register", async (req, res) => {
  const { email, password, profile_pic, firstname, lastname, city, zipcode, address } = req.body;
  try {
    //create a hashed password
    const hash = await bcrypt.hash(password, saltRounds);
    await db(
      `INSERT INTO users (email, password, profile_pic, firstname, lastname, city, zipcode, address) VALUES ('${email}', '${hash}', '${profile_pic}', '${firstname}', '${lastname}', '${city}', '${zipcode}', '${address}');`
    );
    res.send({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
