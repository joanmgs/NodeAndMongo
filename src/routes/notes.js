import express from "express";

// router let you create the routes for the server
const router = express.Router();

router.get("/notes", (req, res) => {
  res.send("All notes");
});

router.get('/notes/add', (req, res) => {
  res.render('notes/addnotes');
});

router.post('/notes/new-note', (req, res) => {
  const { title, description } = req.body;
  const errors = [];
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
  } else {
    res.send('sended!')
  };
  console.log(errors);
});

export default router;
