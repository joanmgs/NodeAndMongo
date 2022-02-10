//@ts-nocheck
import express from "express";
import Note from '../models/Note.js';
// bring authentication middleware
import isAuthenticated from '../helpers/auth.js';

// router let you create the routes for the server
const router = express.Router();

router.get("/notes", isAuthenticated, async (req, res) => {
  //the sort command order by creation date, the first ones are the latest created.
  const notes = await Note.find({ user: req.user.id}).sort({ date: 'desc'}); //the find arg is for bring only the notes of the specific user
  //It's necessary save in a different array for avoid the error: Handlebars: Access has been denied to resolve the property "title" because it is not an "own property" of its parent.
  const myNotes = notes.map( item => {
    return {
      _id: item._id,
      title: item.title,
      description: item.description,
      date: item.date,
      __v: item.__v,
    };
  });
  res.render('notes/all-notes', { myNotes });
});

router.get('/notes/add', isAuthenticated, (req, res) => {
  res.render('notes/addnotes');
});

//addnotes send the data filled in the form here, and then:
// if are errors it renders addnotes again with the errors, but if not, 
// it redirect to /notes route (top in this page) that render again notes/all-notes
router.post('/notes/new-note', isAuthenticated, async (req, res) => { 
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
    newNote.user = req.user.id;
    await newNote.save(); // saved!
    req.flash('success_msg', "Note created!! Yeiiii");
    res.redirect('/notes'); // redirected where all the data are
  };
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
  // The id is for search in the DB the note needed for being edited
  const note = await Note.findById(req.params.id);
  const myNote = {
      _id: note._id,
      title: note.title,
      description: note.description,
      date: note.date,
      __v: note.__v,
    };
  res.render('notes/edit-notes', { myNote });
});

router.put('/notes/edit-notes/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description }); //search through an ID and update the data in the DB
  req.flash('success_msg', "You made THE change buddy ;) ");
  res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', "Die note... DIEEEE!!! ");
  res.redirect('/notes');
});

export default router;
