import express from "express";
import Note from '../models/Note.js';

// router let you create the routes for the server
const router = express.Router();

router.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.render('notes/all-notes', { notes });
});

router.get('/notes/add', (req, res) => {
  res.render('notes/addnotes');
});

router.post('/notes/new-note', async (req, res) => {
  const { title, description } = req.body;
  const errors = [];

  // Conditionals when user don't write title or description in the note
  if(!title) {
    errors.push({
      text: 'Please, insert a title',
    });
  };
  if(!description) {
    errors.push({
      text: 'Please, add a description',
    });
  };
  if(errors.length > 0) {
    res.render('notes/addnotes', {
      errors,
      title,
      description,
    });
  } else {// this is the condition where the new note will be saved in the DB
    const newNote = new Note({ title, description }); 
    await newNote.save(); // saved!
    res.redirect('/notes'); // redirected where all the data are
    console.log(newNote);
  };
});

export default router;
