import express from "express";

// router let you create the routes for the server
const router = express.Router();

router.get("/users/signin", (req, res) => {
  res.render('users/signin');
});

router.get("/users/signup", (req, res) => {
  res.render('users/signup');
});

router.post("/users/signup", (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  console.log(req.body);
  if(name.length <= 0) {
    errors.push({ text: "Please, enter your name"});
  };
  if(email.length <= 0) {
    errors.push({ text: "Please, enter your email"});
  };
  if(password.length < 4) {
    errors.push({ text: "Password should have more than 4 characters"});
  };
  if(password !== confirm_password) {
    errors.push({ text: "Passwords doesn't match"});
  };
  if(errors.length > 0) {
    res.render('users/signup', { errors, name, email, password, confirm_password });
  } else {
    res.send("nice");
  };
});

export default router;
