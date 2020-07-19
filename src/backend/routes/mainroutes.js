const express = require("express");
const maincon = require("../controllers/mainController");
const signincon = require("../controllers/signinController");
const signupcon = require("../controllers/signupController");
const middle = require("../controllers/middle");

const router = express.Router();

router.route("/").get(middle.redirectsignin, maincon.profile);
router.route("/").post(maincon.addtodo);
router.route("/add").post(maincon.deltodo);
router.route("/editbar").post(maincon.editbar);
router.route("/editdata").post(maincon.editdata);
router.route("/done").post(maincon.donetodo);

router.route("/signin").get(middle.redirectprofile, signincon.signinpage);
router.route("/signin").post(signincon.signinuser);
router.route("/signout").get(middle.redirectsignin, signincon.signout);
router.route("/signout").post(middle.redirectsignin, signincon.signout);

router.route("/signup").get(middle.redirectprofile, signupcon.signuppage);
router.route("/signup").post(signupcon.signupuser);


//router.route("/").get(maincon.homepage);
//router.route("/").post(maincon.profile);
//router.route("/signin").get(signincon.signinpage);
//router.route("/signup").get(signupcon.signuppage);
//router.route("/signin").get(signincon.signinpage);
//router.route("/signin").post(signincon.signinuser);

module.exports = router;