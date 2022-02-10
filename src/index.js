//@ts-nocheck
// Libraries
import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import { create } from 'express-handlebars';
import methodOverride from 'method-override';
import session from 'express-session';
import flash from 'connect-flash';
import passport from "passport";
//Import routes
import indexRouter from './routes/index.js';
import notesRouter from "./routes/notes.js";
import usersRouter from "./routes/users.js";

//Initializations
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//DB
import configPassport from './config/passport.js';
import database from "./database.js";


//Settings
// if there are a port in the PC use it, if not, set port in 3000
app.set("port", process.env.PORT || 3000);
// path.join: join directories
// __dirname: give the route where the file is executing; ex: if execute index.js it give me src route
// the next line let node know where the views are located, in this case src/views
app.set("views", path.join(__dirname, "views"));
// hbs: extension for handlebars file
const hbs = create({
  defaultLayout: "main", //define main html page
  layoutsDir: path.join(app.get("views"), "layout"), //path where the html would be
  partialsDir: path.join(app.get("views"), "partials"), //path where the html partials would be
  extname: ".hbs", //file extensions,
});
// the next line sets the extension of views; it could be html, in this case hbs
app.engine('.hbs', hbs.engine);
// set the engine
app.set('view engine', '.hbs');

//Middlewares
// express.urlencoded: allow understand the forms and get the info sended
// extended: false: dont allow images or media of the forms
app.use(express.urlencoded({extended: false}));
// methodOverride: allow forms use more methods like PUT and DELETE
app.use(methodOverride('_method'));
// session: let save the user data in a session
// the object has settings for let the user authenticate and storage the user data temporarily
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true,
}));
// Initialize passport (must be after session)
app.use(passport.initialize());
// It uses the app.use(session(...)) before created
app.use(passport.session());
// next line use flash for create messages for show states, like success or error,
// it should be after the methods that could use it
app.use(flash());



//Global variables
// this create the messages for show states with flash
app.use( (req, res, next) => {
  //create a variable where save the data and not have problems with handlebars
  let userPassport = null;
  
  if(req.user) {
    userPassport = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      password: req.user.password,
      date: req.user.date,
      __v: req.user.__v,
    };
  };

  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.userPassport = userPassport || null;  //passport save the user data in this req.user, if not exist null
  next(); 
});


//Routes
// show the server where the routes are
app.use(indexRouter);
app.use(notesRouter);
app.use(usersRouter);


//Static files
// setting static files in the public folder
app.use(express.static(path.join(__dirname, 'public')));

//Server working -> npm run dev
app.listen(app.get("port"), () => {
  console.log(`Server is working on port: ${app.get("port")}`);
}); //this use the port setting
