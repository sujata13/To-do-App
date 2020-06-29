const db = require("../databases/sqlite");
const lists = db.lists;

const profile = (req, res) => {
  const email = req.session.user.email;
  lists
    .findAll({ where: { email: email } })
    .then(todos => {
      console.log("Showing all todos :" + todos);
      return res.render("profile", { todos });
    })
    .catch(err => {
      console.log("Error Occured! :" + err);
    });
};

const addtodo = (req, res) => {
  const { item } = req.body;
  const email = req.session.user.email;
  lists
    .create({ item, email })
    .then(result => {
      console.log(result + " added");
      return res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

const deltodo = (req, res) => {
  const { id } = req.body;
  lists
    .destroy({ where: { id: id } })
    .then(result => {
      console.log(result + " deleted");
      return res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

const editbar = (req, res) => {
  const { id } = req.body;
  lists
    .update({ edit: true }, { where: { id: id } })
    .then(result => {
      console.log(result);
      return res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

const editdata = (req, res) => {
  const { item, id } = req.body;
  lists
    .update({ edit: false, item: item }, { where: { id: id } })
    .then(result => {
      console.log(result);
      return res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

const donetodo = (req, res) => {
  const { id } = req.body;
  lists
    .update({ done: "alert-success" }, { where: { id: id } })
    .then(result => {
      console.log(result);
      return res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  profile: profile,
  addtodo: addtodo,
  deltodo: deltodo,
  editbar: editbar,
  editdata: editdata,
  donetodo: donetodo
};
