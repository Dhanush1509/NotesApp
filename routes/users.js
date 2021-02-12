const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");

router.get("/", (req, res) => {
  res.send("users");
});
router.post(
  "/",
  [
    check("name", "Name cannot be empty").trim().escape().not().isEmpty(),
    check("email", "email cannot be empty")
      .trim()
      .isEmail()
      .normalizeEmail()
      .escape()
      .not()
      .isEmpty(),
    check(
      "password",
      "Password cannot be empty and it has atleast six characters"
    ).isLength({min:6}).escape()
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {return res.status(400).json({ message: "User already exists" });
    }
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('JsonSecret'),
        { expiresIn: 400000 },
         (err, token)=> {
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
