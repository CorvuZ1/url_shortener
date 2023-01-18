const { cookiesExpirationTime } = require("../utils/constants");

function userAuthentication(req, res, next) {
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
    console.log(error);
    res.status(500).json({ error: true, message: "Что-то пошло не так" });
  }
}

module.exports = { 
  userAuthentication
};