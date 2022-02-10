const helpers = {};

// validate if the user is authenticated or not
helpers.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  };
  req.flash('error_msg', "Not authorized");
  res.redirect('/users/signin');
};

//it will be used in notes.js like a middleware in routes
export default helpers.isAuthenticated;
