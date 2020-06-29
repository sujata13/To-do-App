module.exports = {
      home: home,
      profile: profile,
      signup: signup,
    signin:signin,
    logout:logout,
    };
    
    function home(req, res) {
      res.render("index");
    }
    
    function signup(req, res) {
      res.render("signup");
    }
function profile(res,req){
    res.render("profile")
}    
function signin(req, res) {
      res.render("signin");
    }
    
  function logout(req,res){
res.send("reached at logout")
req.session.destroy();
res.redirect("/signin")
  }

