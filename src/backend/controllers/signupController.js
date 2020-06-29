const dbConn = require("../databases/sqlite.js");
const User = dbConn.Users;
module.exports = {
  signup: signup,
};

function signup(req, res) {
  const { name, email, password } = req.body;
  if (!(name && email && password))
    return res.render("signup", {
      msg: "Fil up all fields first",
    });
  else {
    User.create({
      name,
      email,
      password,
    })
      .then((users) => {
        req.session.email = users.email;
        req.session.user_id = users.id;
        req.session.name = users.name;
        if (users) {
          return res.redirect("/");
        }
      })
      .catch((err) => {
        console.log("Error Found !!user not created");
        console.log("err", err);
        return res.redirect("/");
      });
  }
}
