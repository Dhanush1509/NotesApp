const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const config = require("config");
router.get("/",auth, async (req, res) => {
    try{
        const user =await User.findById(req.user.id).select("-password");
        res.json({user});
    }
  catch(err){
      console.error(err.message);
      res.status(401).send("Authorisation denied");
  }
});
router.post(
  "/",
  [
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
    )
      .isLength({ min: 6 })
      .escape()
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "invalid credentials" });
      }
 
    await bcrypt.compare(password, user.password);
      if (!user) {
        return res.status(400).json({ message: "invalid credentials" });
      }


      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, config.get("JsonSecret"), { expiresIn: 400000 }, (err, token) => {
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
module.exports = router;
