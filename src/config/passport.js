//@ts-nocheck
// libraries for authenticate user and save data in a session
import passport from "passport";
import passportLocal from "passport-local"; // for local authentication

import User from "../models/User.js";

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy( //defines authentication strategy
    {
      usernameField: "email", //how the user going to authenticate, in this case with email
    },
    async (email, password, done) => { //this function validate the user
      //done is a function which finish the authentication process
      const user = await User.findOne({ email: email }); //search user through email in DB
      if (!user) { //invalid email
        // (returnError, userExist, msg) null: there isn't an error
        return done(null, false, { message: "User doesn't exist" }); //callback that finish the authentication process
      } else {
        const match = await User.matchPassword(password); //validate password
        if (match) {
          return done(null, user); //no error and send finded user
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      }
    }
  )
);

//after the user authenticate, it will be store
passport.serializeUser( (user, done) => {
  //if user exist, store his id
  //(returnError, user)
  done(null, user.id); 
});

//if there's a user in session, find it or get an error
passport.deserializeUser( (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

