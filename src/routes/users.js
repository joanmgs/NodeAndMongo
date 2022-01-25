import express from "express";

// router let you create the routes for the server
const router = express.Router();

router.get("/users/signin", (req, res) => {
  res.render('users/signin');
});

router.get("/users/signup", (req, res) => {
  res.render('users/signup');
});

export default router;
