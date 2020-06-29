const db = require("../databases/sqlite");
const users = db.users;

const signuppage = (req, res) => {
  return res.render("signup");
};

const signupuser = (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
  users
    .create({
      name,
      email,
      password
    })
    .then(result => {
      req.session.user = { email, name };
      console.log("Added" + result);
      return res.redirect("/");
    })
    .catch(err => console.log(err));
};

module.exports = { signuppage, signupuser };
