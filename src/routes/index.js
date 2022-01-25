import express from "express";

// router let you create the routes for the server
const router = express.Router();

router.get("/", (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render("about");
});

export default router;
