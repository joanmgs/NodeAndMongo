import express from "express";
import Note from '../models/Note.js';

// router let you create the routes for the server
const router = express.Router();

router.get("/notes", async (req, res) => {
  //the sort command order by creation date, the first ones are the latest created.
  const notes = await Note.find().sort({ date: 'desc'});
  //It's necessary save in a different array for avoid the error: Handlebars: Access has been denied to resolve the property "title" because it is not an "own property" of its parent.
  const myNotes = notes.map( item => {
    return {
      title: item.title,
      description: item.description,
    };
  });
  
  res.render('notes/all-notes', { myNotes });
});

router.get('/notes/add', (req, res) => {
  res.render('notes/addnotes');
});

//addnotes send the data filled in the form here, and then:
// if are errors it renders addnotes again with the errors, but if not, 
// it redirect to /notes route (top in this page) that render again notes/all-notes
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
