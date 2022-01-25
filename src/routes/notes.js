import express from "express";

// router let you create the routes for the server
const router = express.Router();

router.get("/notes", (req, res) => {
  res.send("All notes");
});

router.get('/notes/add', (req, res) => {
  res.render('notes/addnotes');
});

export default router;
