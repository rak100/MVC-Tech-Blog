const w_Auth = (req, res, next) => {
  
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports =  w_Auth;
