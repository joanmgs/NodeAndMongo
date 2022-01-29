//@ts-nocheck
import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import { create } from 'express-handlebars';
import methodOverride from 'method-override';
import session from 'express-session';
//Import routes
import indexRouter from './routes/index.js';
import notesRouter from "./routes/notes.js";
import usersRouter from "./routes/users.js";
import database from "./database.js";


//Initializations
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


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
  partialsDir: path.join(app.get("views"), "partials"), //path where the html mixins would be
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


//Global variables

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
