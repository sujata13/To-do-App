const sq = require("sequelize");

const db = new sq({
  dialect: "sqlite",
  storage: "./backend/databases/database.sqlite"
});

const lists = db.define("lists", {
  item: {
    type: sq.STRING,
    allowNull: false
  },
  edit: {
    type: sq.BOOLEAN,
    defaultValue: false
  },
  done: {
    type: sq.STRING,
    defaultValue: "alert-dark"
  },
  email: {
    type: sq.STRING
  }
});

const users = db.define("users", {
  name: {
    type: sq.STRING,
    allowNull: false
  },
  email: {
    type: sq.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: sq.STRING,
    allowNull: false
  }
});

db.sync()
  .then(() => {
    console.log("Database Synced");
  })
  .catch(err => {
    console.log("Error Occured: " + err);
  });

module.exports = {
  lists: lists,
  users: users
};
