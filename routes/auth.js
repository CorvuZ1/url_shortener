const { Router } = require("express");
const router = Router();
const session = require("express-session");

const cookiesExpirationTime = process.env.COOKIE_EXPIRATION_TIME * 3600000;
const { SESSION_SECRET } = process.env;

router.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie:{
    maxAge: cookiesExpirationTime, 
  }
}));

router.post("/auth", (req, res, next) => {
  try {
    const { ACCESS_TOKEN } = process.env;
    const { token } = req.body;
    
    if (token === ACCESS_TOKEN) {
      req.session.isAuth = true;
      res.cookie("isAuth", "true", { maxAge: cookiesExpirationTime });
      res.status(200).json({ error: false, message: "Вы вошли" });
      next();
    } else {
      req.session.isAuth = false;
      res.status(403).json({ error: true, message: "Неверный ключ" });
    }
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: true, message: "Что-то пошло не так" });
  }
})


module.exports = router;