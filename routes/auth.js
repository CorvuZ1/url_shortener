const { Router } = require("express");
const session = require("express-session");
const { userAuthentication } = require("../controllers/auth");
const { cookiesExpirationTime } = require("../utils/constants");

const router = Router();
const { SESSION_SECRET } = process.env;

router.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: cookiesExpirationTime
    }
  })
);

router.post("/auth", userAuthentication);

module.exports = router;
