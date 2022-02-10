//@ts-nocheck
import express from "express";
import User from "../models/User.js";
import passport from "passport";

// router let you create the routes for the server
const router = express.Router();

router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.post("/users/signin", passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true,
}));

router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (name.length <= 0) {
    errors.push({ text: "Please, enter your name" });
  }
  if (email.length <= 0) {
    errors.push({ text: "Please, enter your email" });
  }
  if (password.length < 4) {
    errors.push({ text: "Password should have more than 4 characters" });
  }
  if (password !== confirm_password) {
    errors.push({ text: "Passwords doesn't match" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    // Email validation to know if the email exist in the DB
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "You're part of this since long ago... ");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ name, email, password }); //create User
      newUser.password = await newUser.encryptPassword(password); //save the password encrypted using method encryptPassword created in the Schema
      await newUser.save();
      req.flash("success_msg", "You're now part of this:)");
      res.redirect("/users/signup");
    }
  }
});

router.get("/users/logout", (req, res) => {
  //passport let finish the session
  req.logOut();
  res.redirect('/');
});

export default router;
