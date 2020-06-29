module.exports = {
    profile: profile,
    signup: signup,
    signin: signin,
    logout: logout,
  };
    
  function signup(req, res) {
    res.render("signup");
  }
  function profile(res, req) {
    res.render("profile");
  }
  function signin(req, res) {
    res.render("signin");
  }
  
  function logout(req, res) {
    res.send("reached at logout");
    req.session.destroy();
    res.redirect("/signin");
  }
  
