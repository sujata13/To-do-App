const express = require("express");
const alphacon = require("../controllers/alphacon");
const signincon = require("../controllers/signincon");
const signupcon = require("../controllers/signupcon");
const middle = require("../controllers/middle");

const router = express.Router();

router.route("/").get(middle.redirectsignin, alphacon.profile);
router.route("/").post(alphacon.addtodo);
router.route("/add").post(alphacon.deltodo);
router.route("/editbar").post(alphacon.editbar);
router.route("/editdata").post(alphacon.editdata);
router.route("/done").post(alphacon.donetodo);

router.route("/signin").get(middle.redirectprofile, signincon.signinpage);
router.route("/signin").post(signincon.signinuser);
router.route("/signout").get(middle.redirectsignin, signincon.signout);
router.route("/signout").post(middle.redirectsignin, signincon.signout);

router.route("/signup").get(middle.redirectprofile, signupcon.signuppage);
router.route("/signup").post(signupcon.signupuser);

module.exports = router;
