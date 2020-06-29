const redirectsignin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/signin");
  } else {
    next();
  }
};

const redirectprofile = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = { redirectsignin, redirectprofile };
