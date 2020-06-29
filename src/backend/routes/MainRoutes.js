const express = require("express");
const mainController = require("../controllers/MainController");
const loginController = require("../controllers/LoginController");
const signinController=require("../controllers/SigninController")
const todoController= require("../controllers/todoController");
const middle= require("../controllers/middle");
const router = express.Router();
const app = express();
// router.route("/").get(mainController.home); 
router.route("/").get(todoController.displayList);
// router.route("/signup").get(mainController.signup); 

router.route("/signup").get(middle.redirectprofile, mainController.signup);

router.route("/signup").post(loginController.signup); 
// router.route("/signin").get(mainController.signin); 
router.route("/signin").get(middle.redirectprofile, mainController.signin)
router.route("/signin").post(signinController.signin);
router.route("/add").post(todoController.add);
router.route("/edit").post(todoController.editList);
router.route("/delete").post(todoController.deleteList);
router.route("/logout").get(mainController.logout);
// router.route("/signin").get(mainController.signin); 
// router.route("/signin").post(loginController.signin); 
module.exports = router;
