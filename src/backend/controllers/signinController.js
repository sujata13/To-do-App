const dbConn = require("../databases/sqlite.js");
const User = dbConn.Users;
module.exports = {
  signin: signin,
};

function signin(req, res) {
  const { email, password } = req.body;
  if (!(email && password))
    return res.render("signin", {
      msg: "Fill up all fields first",
    });
  else {
    User.findOne({
      where: {
        email: email,
        password: password,
      },
    })
    
      .then((users) => {
        req.session.email = users.email;
        req.session.user_id = users.id;
        req.session.name = users.name;
        return res.redirect("/");
      })

      .catch((err) => {
        console.log("user not found");
        console.log(err);
        return res.redirect("/signin");
      });
  }
}
