const Sequelize = require("sequelize");
const path = require('path')
const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: path.resolve(__dirname,'database.sqlite')
});

const users = sequelize.define("users", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
});

const lists = sequelize.define("lists", {
      item:{
          type: Sequelize.STRING,
          allowNull: false
      },
      edit: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      done: {
        type: Sequelize.STRING,
        allowNull: false
      },
    email: {
        type: Sequelize.STRING
      }
});

sequelize
  .sync()
  .then(() =>
    console.log(
      "Users and Lists table has been successfully created, if one doesn't exist"
    )
  )
  .catch(error => console.log("This error occurred"+ error));


module.exports = {
      users: users,
      lists: lists 
};
    