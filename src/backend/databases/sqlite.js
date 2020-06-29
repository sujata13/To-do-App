const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  // storage: "./src/backend/databases/database.sqlite"
  storage: __dirname + "/database.sqlite",
});

const users = sequelize.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const lists = sequelize.define("lists", {
  user_id: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  item: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  edit: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  done: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

users
  .sync()
  .then(() =>
    console.log(
      "user table has been suuccessfully created, if one doesn't exist"
    )
  )
  .catch((error) => console.log(error));

lists
  .sync()
  .then(() =>
    console.log(
      "list table has been successfully created, if one doesn't exist"
    )
  )
  .catch((error) => console.log(error));

module.exports = {
  Users: users,
  Lists: lists,
};
