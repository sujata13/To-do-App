const express = require("express");
const mainController = require("../controllers/mainController");
const signupController = require("../controllers/signupController");
const signinController = require("../controllers/signinController");
const profileController = require("../controllers/profileController");
const middle = require("../controllers/middle");
const { signin } = require("../controllers/signinController");
const router = express.Router();
const app = express();

router.route("/").get(profileController.displayList);
router.route("/signup").get(middle.redirectprofile, mainController.signup);
router.route("/signup").post(signupController.signup);
router.route("/signin").get(middle.redirectprofile, mainController.signin);
router.route("/signin").post(signinController.signin);
router.route("/add").post(profileController.add);
router.route("/edit").post(profileController.editList);
router.route("/delete").post(profileController.deleteList);
router.route("/logout").get(mainController.logout);

module.exports = router;
