const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const UserController = require("../controllers/users.js");

router
  .route("/signup")
  .get(UserController.renderSignupPage)
  .post(WrapAsync(UserController.signup));

router
  .route("/login")
  .get(UserController.renderLoginPage)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    WrapAsync(UserController.Login)
  );

router.get("/logout", UserController.Logout);

module.exports = router;
